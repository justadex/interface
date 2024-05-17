import { Address, erc20Abi, formatUnits } from "viem";
import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { config } from "./components/Wagmi/config";
import { YakRouterABI } from "./abi/YakRouterABI";
import { SwapStatus, TradeInfo } from "./types/interface";

const YakRouterAddress = "0x64f1Cd91F37553E5A8718f7D235e5078C962b7e7";
const WETH_ADDRESS: Address = "0x4200000000000000000000000000000000000006";
const EMPTY_ADDRESS: Address = "0x0000000000000000000000000000000000000000";

const checkAllowance = async (tokenInAddress: string, userAddress: Address) => {
  try {
    let result = await readContract(config, {
      abi: erc20Abi,
      address: tokenInAddress as Address,
      functionName: "allowance",
      args: [userAddress, YakRouterAddress],
    });
    return {
      success: true,
      data: result,
    };
  } catch (e: any) {
    throw e;
  }
};

const callApprove = async (tokenInAddress: string, amountIn: bigint) => {
  try {
    let result = await writeContract(config, {
      abi: erc20Abi,
      address: tokenInAddress as Address,
      functionName: "approve",
      args: [YakRouterAddress, amountIn],
    });
    await waitForTransaction(result);
    return {
      success: true,
      data: result,
    };
  } catch (e: any) {
    throw e;
  }
};

const swapFromEth = async (tradeInfo: TradeInfo, userAddress: Address) => {
  try {
    let result = await writeContract(config, {
      abi: YakRouterABI,
      address: YakRouterAddress,
      functionName: "swapNoSplitFromAVAX",
      args: [
        {
          adapters: tradeInfo.adapters,
          amountIn: tradeInfo.amountIn,
          amountOut: tradeInfo.amountOut,
          path: tradeInfo.path,
        },
        userAddress,
        BigInt(0),
      ],
      value: tradeInfo.amountIn,
    });
    await waitForTransaction(result);
    return {
      success: true,
      data: result,
    };
  } catch (e: any) {
    throw e;
  }
};

const swapToEth = async (tradeInfo: TradeInfo, userAddress: Address) => {
  try {
    let result = await writeContract(config, {
      abi: YakRouterABI,
      address: YakRouterAddress,
      functionName: "swapNoSplitToAVAX",
      args: [
        {
          adapters: tradeInfo.adapters,
          amountIn: tradeInfo.amountIn,
          amountOut: tradeInfo.amountOut,
          path: tradeInfo.path,
        },
        userAddress,
        BigInt(0),
      ],
    });
    await waitForTransaction(result);
    return {
      success: true,
      data: result,
    };
  } catch (e: any) {
    throw e;
  }
};

const swap = async (tradeInfo: TradeInfo, userAddress: Address) => {
  try {
    let result = await writeContract(config, {
      abi: YakRouterABI,
      address: YakRouterAddress,
      functionName: "swapNoSplit",
      args: [
        {
          adapters: tradeInfo.adapters,
          amountIn: tradeInfo.amountIn,
          amountOut: tradeInfo.amountOut,
          path: tradeInfo.path,
        },
        userAddress,
        BigInt(0),
      ],
    });
    await waitForTransaction(result);
    return {
      success: true,
      data: result,
    };
  } catch (e: any) {
    throw e;
  }
};

const waitForTransaction = async (hash: Address) => {
  try {
    const transactionReceipt = await waitForTransactionReceipt(config, {
      confirmations: 2,
      hash,
    });
    if (transactionReceipt.status === "success") {
      return {
        success: true,
        data: transactionReceipt,
      };
    }
    throw transactionReceipt.status;
  } catch (e: any) {
    throw e;
  }
};

export const swapTokens = async (
  setStatus: (status: SwapStatus) => void,
  tokenInAddress: Address,
  tokenOutAddress: Address,
  userAddress: Address,
  tradeInfo: TradeInfo
) => {
  try {
    setStatus("LOADING");
    const defaultResponse = {
      success: false,
      data: EMPTY_ADDRESS,
    };
    let swapResponse = defaultResponse;
    if (tokenInAddress !== EMPTY_ADDRESS) {
      const approvedTokens = await checkAllowance(tokenInAddress, userAddress);
      if (approvedTokens.data < tradeInfo.amountIn) {
        setStatus("APPROVING");
        await callApprove(tokenInAddress, tradeInfo.amountIn);
      }
    }
    // setStatus("APPROVED");
    setStatus("SWAPPING");
    if (tokenInAddress === EMPTY_ADDRESS) {
      swapResponse = await swapFromEth(tradeInfo, userAddress);
    } else if (tokenOutAddress === EMPTY_ADDRESS) {
      swapResponse = await swapToEth(tradeInfo, userAddress);
    } else {
      swapResponse = await swap(tradeInfo, userAddress);
    }
    setStatus("SWAPPED");
    return swapResponse;
  } catch (error) {
    throw error;
  }
};
