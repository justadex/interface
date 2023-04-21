"use client";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
// import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains([mainnet], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function RainbowKit({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        theme={darkTheme({
          fontStack: "system",
        })}
        chains={chains}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
