import { Address, erc20Abi, formatUnits } from "viem";
import {
  readContract,
  writeContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { config } from "./components/Wagmi/config";
import { JadRouterABI } from "./abi/JadRouterABI";
import { WethABI } from "./abi/WETHABI";
import { SwapStatus, TradeInfo } from "./types/interface";

const JadRouterAddress = process.env.NEXT_PUBLIC_ROUTER as `0x{string}`;
const WETH_ADDRESS: Address = "0x4200000000000000000000000000000000000006";
const EMPTY_ADDRESS: Address = "0x0000000000000000000000000000000000000000";

const checkAllowance = async (tokenInAddress: string, userAddress: Address) => {
  try {
    let result = await readContract(config, {
      abi: erc20Abi,
      address: tokenInAddress as Address,
      functionName: "allowance",
      args: [userAddress, JadRouterAddress],
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
      args: [JadRouterAddress, amountIn],
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
      abi: JadRouterABI,
      address: JadRouterAddress,
      functionName: "swapNoSplitFromETH",
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
      abi: JadRouterABI,
      address: JadRouterAddress,
      functionName: "swapNoSplitToETH",
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

const swapNoSplitToEth = async (tradeInfo: TradeInfo, userAddress: Address) => {
  try {
    let result = await writeContract(config, {
      abi: WethABI,
      address: WETH_ADDRESS,
      functionName: "withdraw",
      args: [tradeInfo.amountIn]
    });
    await waitForTransaction(result);
    return {
      success: true,
      data: result,
    };
  } catch (e: any) {
    throw e;
  }
}

const swapNoSplitFromEth = async (tradeInfo: TradeInfo, userAddress: Address) => {
  try {
    let result = await writeContract(config, {
      abi: WethABI,
      address: WETH_ADDRESS,
      functionName: "deposit",
      args: [],
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
}

const swap = async (tradeInfo: TradeInfo, userAddress: Address) => {
  try {
    let result = await writeContract(config, {
      abi: JadRouterABI,
      address: JadRouterAddress,
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
  setSwapHash: (hash: string) => void,
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
    if (tokenInAddress === EMPTY_ADDRESS && tokenOutAddress === WETH_ADDRESS) {
      swapResponse = await swapNoSplitFromEth(tradeInfo, userAddress);
    } else if (tokenInAddress === WETH_ADDRESS && tokenOutAddress === EMPTY_ADDRESS) {
      swapResponse = await swapNoSplitToEth(tradeInfo, userAddress);
    } else if (tokenInAddress === EMPTY_ADDRESS) {
      swapResponse = await swapFromEth(tradeInfo, userAddress);
    } else if (tokenOutAddress === EMPTY_ADDRESS) {
      swapResponse = await swapToEth(tradeInfo, userAddress);
    } else {
      swapResponse = await swap(tradeInfo, userAddress);
    }
    setStatus("SWAPPED");
    setSwapHash(swapResponse.data);
    return swapResponse;
  } catch (error) {
    throw error;
  }
};
