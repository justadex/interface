"use client";
import { Connector, useConnect, useEnsName } from "wagmi";
import { getAccount } from "@wagmi/core";
import { config } from "../Wagmi/config";
import { disconnect } from "@wagmi/core";
import { getChainId } from "@wagmi/core";
import { useEffect } from "react";
import { switchChain } from "wagmi/actions";
import { watchChainId } from "@wagmi/core";
import Truncate from "@/app/utils/truncate";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConnectButton } from '@rainbow-me/rainbowkit';

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
    // <div className="flex flex-col gap-4">
    //   <div>
    //     {account.address ? (
    //       <div className="flex flex-row justify-center items-center gap-2">
    //         {Truncate(account.address, 16, "...")}
    //         <svg
    //           onClick={() => disconnect(config)}
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           stroke-width="1.5"
    //           stroke="currentColor"
    //           className="w-6 h-6 cursor-pointer"
    //         >
    //           <path
    //             stroke-linecap="round"
    //             stroke-linejoin="round"
    //             d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
    //           />
    //         </svg>
    //       </div>
    //     ) : (
    //       <Dialog>
    //         <DialogTrigger className="px-6 py-2.5 text-white rounded-md shadow-sm cursor-pointer bg-accent font-semibold">
    //           Connect
    //         </DialogTrigger>
    //         <DialogContent className="bg-primary border max-w-xl border-white/20">
    //           <DialogHeader className="flex flex-col gap-4">
    //             <DialogTitle>Avaliable Wallets</DialogTitle>
    //             <DialogDescription>
    //               <ul className="flex flex-col gap-4 justify-center items-center">
    //                 {connectors.map((connector) => (
    //                   <li
    //                     className="bg-white w-full rounded text-primary py-3 font-semibold flex justify-center items-center cursor-pointer"
    //                     key={connector.uid}
    //                     onClick={() => connect({ connector })}
    //                   >
    //                     {connector.name}
    //                   </li>
    //                 ))}
    //               </ul>
    //             </DialogDescription>
    //           </DialogHeader>
    //         </DialogContent>
    //       </Dialog>
    //     )}
    //   </div>
    // </div>
    <ConnectButton />
  );
}
