"use client";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function WalletConnect() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="px-6 py-2 text-white rounded-md shadow-sm cursor-pointer bg-accent font-semibold"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    className="bg-[#FF494A] px-4 py-2 rounded text-white"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="flex flex-row justify-center items-center gap-4">
                  <button
                    onClick={openChainModal}
                    className="flex flex-row justify-center items-center gap-2 bg-[#DFFE00] text-primary font-semibold px-4 py-2 rounded"
                    type="button"
                  >
                    {chain.name}
                  </button>
                  <button
                    className="px-6 py-2 text-white rounded-md shadow-sm cursor-pointer bg-secondary font-semibold"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {account.ensName ? account.ensName : account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
