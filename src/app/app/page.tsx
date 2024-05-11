"use client";
import { useReadContract } from "wagmi";
import { YakRouterABI } from "./abi/YakRouterABI";
import { formatEther } from "viem";
import { ethers } from "ethers";
import Main from "./main";

export default function Page() {
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
  console.log(result);
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
