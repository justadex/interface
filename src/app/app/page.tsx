"use client";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import { YakRouterABI } from "./abi/YakRouterABI";
import { formatEther } from "viem";
import Main from "./main";
import { useEffect } from "react";

export default function Page() {


  const { address, isConnected } = useAccount();
  const { data: hash, isError: isSwapError, error: swapError, writeContract } = useWriteContract();
  const result = useReadContract({
    abi: YakRouterABI,
    address: "0x64f1Cd91F37553E5A8718f7D235e5078C962b7e7",
    functionName: "findBestPathWithGas",
    args: [
      BigInt("1000000000000000000"),
      "0x4200000000000000000000000000000000000006",
      "0xf0F161fDA2712DB8b566946122a5af183995e2eD",
      BigInt("4"),
      BigInt("1000000000000000000"),
    ],
  });
  console.log(result.data);
  console.log(result.data?.amounts[1] ? formatEther(result.data?.amounts[1]) : "");

  async function getQuote() {
    if (!result.data || !isConnected) {
      console.log("returned");
      return;
    }
    const swapResult = writeContract({
      address: "0x64f1Cd91F37553E5A8718f7D235e5078C962b7e7",
      abi: YakRouterABI,
      functionName: "swapNoSplit",
      args: [
        {
          amountIn: result.data?.amounts[0]!,
          amountOut: result.data?.amounts[1]!,
          path: result.data?.path!,
          adapters: result.data?.adapters!,
        },
        address!,
        BigInt("0")
      ],
    });

    console.log(swapResult);
    console.log(hash);
  }


  useEffect(() => {
    console.log(hash);
  }, [hash])

  useEffect(() => {
    console.log(swapError)
  }, [swapError])











  //   async function getBestPaths() {
  //     const provider = new ethers.providers.JsonRpcProvider(
  //       "https://mainnet.mode.network"
  //     );
  //     const yakRouter = new ethers.Contract(
  //       "0x64f1Cd91F37553E5A8718f7D235e5078C962b7e7",
  //       YakRouterABI,
  //       provider
  //     );
  //     const result = await yakRouter.findBestPathWithGas(
  //       ethers.BigNumber.from("1000000000000000000"), // 1 ETH in wei
  //       "0x4200000000000000000000000000000000000006",
  //       "0xf0F161fDA2712DB8b566946122a5af183995e2eD",
  //       ethers.BigNumber.from(4),
  //       ethers.BigNumber.from("1000000000000000000") // 1 ETH in wei
  //     );
  //     console.log(result);
  //   }
  //   getBestPaths();
  return <Main />;
}
