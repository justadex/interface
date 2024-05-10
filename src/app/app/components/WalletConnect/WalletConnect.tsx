"use client";
import { Connector, useConnect } from "wagmi";
import { getAccount } from "@wagmi/core";
import { config } from "../Wagmi/config";
import { disconnect } from "@wagmi/core";
import { getChainId } from "@wagmi/core";
import { useEffect } from "react";
import { switchChain } from "wagmi/actions";
import { watchChainId } from "@wagmi/core";

export default function WalletOptions() {
  const { connectors, connect } = useConnect();
  const account = getAccount(config);

  useEffect(() => {
    const chain = watchChainId;
    console.log(chain);
    // if (chain !== 34443) {
    //   switchChain(config, { chainId: 34443 });
    // }
  }, [account.address]);
  return (
    <div className="flex flex-col gap-4">
      <div>
        {account.address ? (
          <div>
            {account.address}
            <button onClick={() => disconnect(config)}>Disconnect</button>
          </div>
        ) : (
          connectors.map((connector) => (
            <button key={connector.uid} onClick={() => connect({ connector })}>
              {connector.name}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
