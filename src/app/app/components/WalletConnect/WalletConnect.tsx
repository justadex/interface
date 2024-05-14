"use client";
import { getAccount } from "@wagmi/core";
import { config } from "../Wagmi/config";
import { useEffect } from "react";
import { watchChainId } from "@wagmi/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function WalletOptions() {
  const account = getAccount(config);

  useEffect(() => {
    const chain = watchChainId;
    console.log(chain);
  }, [account.address]);
  return <ConnectButton />;
}
