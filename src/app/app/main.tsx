"use client";

import { Fragment, useEffect, useRef, useState } from "react";

import { useAccount, useConnect } from "wagmi";

import Image from "next/image";

import Tokens from "@/app/app/data/tokens.json";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const Swap = () => {
  const [enabled, setEnabled] = useState(false);
  const { address, isConnected } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg p-4 rounded-2xl shadow-sm bg-primary border-[1px] border-white/20 text-offwhite">
        <div className="flex flex-row items-center justify-between gap-4">
          <h2 className="text-lg font-bold">Swap</h2>
          <div></div>
        </div>
        <div className="my-4 mt-2">
          <div className="flex flex-col items-stretch justify-center gap-4 px-4 py-6 rounded-xl bg-secondary">
            <div className="flex flex-row items-center justify-between">
              <input
                className="w-full text-3xl bg-transparent focus:outline-none"
                type="text"
                placeholder="0"
              />
              <button
                className="flex flex-row items-center justify-center gap-1 px-4 py-1 text-white rounded-full cursor-pointer bg-slate-600"
                onClick={() => setIsOpen(true)}
              >
                <Image
                  src={"/tokens/eth.png"}
                  width="20"
                  height="20"
                  alt="ETH"
                />
                <h3 className="font-semibold w-max">ETH</h3>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="text-sm">$1,886.28</div>
              <div className="text-sm">Balance: 10.00</div>
            </div>
          </div>
          <div className="border">
            <div className="flex items-center justify-center h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col items-stretch justify-center gap-4 px-4 py-6 rounded-xl bg-secondary">
            <div className="flex flex-row items-center justify-between">
              <input
                className="w-full text-3xl bg-transparent focus:outline-none"
                type="text"
                placeholder="0"
              />
              <button
                className="flex flex-row items-center justify-center gap-1 px-4 py-1 text-white rounded-full cursor-pointer bg-accent"
                onClick={() => setIsOpen(true)}
              >
                <h3 className="font-semibold w-max">Select a token</h3>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="text-sm">$1,886.28</div>
              <div className="text-sm">Balance: 10.00</div>
            </div>
          </div>
        </div>
        <div>
          {isConnected ? (
            <button className="w-full px-8 py-4 text-lg font-semibold rounded-3xl bg-accent/40 text-accent hover:bg-accent/20">
              Select a Token
            </button>
          ) : (
            <button className="w-full px-8 py-4 text-lg font-semibold rounded-3xl bg-accent/40 text-accent hover:bg-accent/20">
              Connect Wallet
            </button>
          )}
        </div>
      </div>
      <Dialog open={isOpen}>
        {/* <div className="fixed inset-0 bg-black/60" aria-hidden="true" /> */}
        {/* <div className="fixed inset-0 flex items-center justify-center p-4 text-black">
         
        </div> */}
        <DialogContent className="flex flex-col w-full max-w-md text-white bg-primary rounded-3xl border-[1px] border-opacity-25 border-offwhite shadow-md overflow-clip">
          <div className="flex flex-col gap-4 px-4 pb-6 pt-0">
            <div className="flex flex-row items-center justify-between">
              <DialogTitle>Select a Token</DialogTitle>
            </div>
            <div className="relative">
              <input
                className="w-full px-12 py-2 bg-secondary rounded-2xl focus:outline-none focus:bg-primary border-[1px] border-opacity-25 border-offwhite"
                placeholder="Search a name or paste address"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute w-6 h-6 top-2 left-2"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex flex-row flex-wrap items-start justify-start gap-4">
              {Tokens.map(
                (token, i) =>
                  token.featured === true && (
                    <div
                      className="flex flex-row items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-full bg-secondary border-[1px] border-opacity-25 border-offwhite hover:bg-primary cursor-pointer"
                      key={i}
                    >
                      <Image
                        className="rounded-full"
                        src={token.image}
                        alt={token.name}
                        height="25"
                        width="25"
                      />
                      <h4 className="text-base">{token.ticker}</h4>
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="h-[1px] w-full border-[1px] border-offwhite border-opacity-25"></div>
          <div className="flex flex-col items-start justify-start gap-4 py-2 overflow-y-auto overflow-x-clip scrollbar-thumb-gray-900 scrollbar-thin h-96">
            {Tokens.map((token, i) => {
              return (
                <div
                  className="flex flex-row items-center justify-between w-full gap-4 px-4 pt-1.5 rounded-full cursor-pointer hover:opacity-60"
                  key={i}
                >
                  <div className="flex flex-row items-center justify-start w-1/2 gap-4">
                    <div>
                      <Image
                        className="rounded-full aspect-square"
                        src={token.image}
                        alt={token.name}
                        height="35"
                        width="35"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-base">{token.name}</h4>
                      <h5 className="text-sm text-offwhite">{token.ticker}</h5>
                    </div>
                  </div>
                  <div>0</div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Swap;
