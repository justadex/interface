"use client";
import {
  useReadContract,
  useWriteContract,
  useAccount,
  useSwitchChain,
} from "wagmi";
import { YakRouterABI } from "./abi/YakRouterABI";
import { formatEther } from "viem";
import Main from "./main";
import { useEffect } from "react";

export default function Page() {
  const { chains, switchChain } = useSwitchChain();

  const { address, isConnected, chainId } = useAccount();

  //   useEffect(() => {
  //     console.log(chainId);
  //     if (chainId != 1337) {
  //       console.log("switching to chainid");
  useEffect(() => {
    console.log(chainId);
    if (chainId != 34443) {
      switchChain({ chainId: 34443 });
    }
  }, [chainId]);

  return <Main />;
}
