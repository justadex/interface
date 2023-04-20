"use client";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";

const client = createClient({
  autoConnect: false,
  provider: getDefaultProvider(),
});

export default function Connect({ children }: { children: React.ReactNode }) {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
}
