"use client";
import { useReadContract } from "wagmi";
import { YakRouterABI } from "./abi/YakRouterABI";
import { formatEther } from "viem";

export default function Page() {
  const result = useReadContract({
    abi: YakRouterABI,
    address: "0x64f1Cd91F37553E5A8718f7D235e5078C962b7e7",
    functionName: "findBestPathWithGas",
    args: [
      BigInt(formatEther(BigInt("1000000000000000000"), "wei")),
      "0x4200000000000000000000000000000000000006",
      "0xf0F161fDA2712DB8b566946122a5af183995e2eD",
      BigInt(4),
      BigInt(formatEther(BigInt("1000000000000000000"), "wei")),
    ],
  });
  console.log(result.data);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div>App</div>
    </div>
  );
}
