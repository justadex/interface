"use client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Switch } from "@headlessui/react";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import Tokens from "./../../data/tokens.json";

const Swap = () => {
  const [enabled, setEnabled] = useState(false);
  const { address, isConnected } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg p-4 rounded-2xl shadow-sm bg-primary border-[1px] border-white/20 text-offwhite">
        <div className="flex flex-row items-center justify-between gap-4">
          <h2 className="text-lg font-bold">Swap</h2>
          <div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full text-sm font-medium rounded-xl focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-40 mt-2 origin-top-right bg-primary border-[1px] border-white/20 rounded-xl shadow-lg focus:outline-none">
                  <div className="flex flex-col items-start justify-start gap-4 px-4 py-3">
                    <h3 className="font-semibold">Settings</h3>
                    <div className="flex flex-col items-start justify-start gap-1">
                      <div className="flex flex-row items-center justify-start gap-2">
                        <h4>Slippage tolerance</h4>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="flex flex-row items-start justify-start gap-2">
                        <div className="px-2 py-1 text-white shadow-sm rounded-xl bg-accent">
                          <h4>Auto</h4>
                        </div>
                        <div className="relative px-4 py-1.5 text-right text-white rounded-xl bg-secondary">
                          <input
                            type="text"
                            placeholder="0.1"
                            className="bg-transparent focus:outline-none"
                          />
                          <div className="absolute top-1.5 right-2">%</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start justify-start w-full gap-1">
                      <h3 className="font-semibold">Interface Settings</h3>
                      <div className="flex flex-col w-full gap-2">
                        <div className="flex flex-row items-center justify-between w-full gap-2">
                          <div className="flex flex-row items-center justify-center gap-1">
                            <h4>Auto Router API</h4>
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                />
                              </svg>
                            </span>
                          </div>

                          <Switch
                            checked={enabled}
                            onChange={setEnabled}
                            className={`${
                              enabled ? "bg-blue-600" : "bg-gray-200"
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
                            <span
                              className={`${
                                enabled ? "translate-x-6" : "translate-x-1"
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                          </Switch>
                        </div>
                        <div className="flex flex-row items-center justify-between w-full gap-2">
                          <div className="flex flex-row items-center justify-center gap-1">
                            <h4>Expert Mode</h4>
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                />
                              </svg>
                            </span>
                          </div>

                          <Switch
                            checked={enabled}
                            onChange={setEnabled}
                            className={`${
                              enabled ? "bg-blue-600" : "bg-gray-200"
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span className="sr-only">
                              Enable notifications
                            </span>
                            <span
                              className={`${
                                enabled ? "translate-x-6" : "translate-x-1"
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                          </Switch>
                        </div>
                      </div>
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div className="my-4">
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
            <div className="text-sm">$1,886.28</div>
          </div>
          <div className="border">
            <div className="flex items-center justify-center h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
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
            <div className="text-sm">$1,886.28</div>
          </div>
        </div>
        <div>
          {isConnected ? (
            <button className="w-full px-8 py-4 text-lg font-semibold rounded-3xl bg-accent/40 text-accent hover:bg-accent/20">
              Select a Token
            </button>
          ) : (
            <button
              className="w-full px-8 py-4 text-lg font-semibold rounded-3xl bg-accent/40 text-accent hover:bg-accent/20"
              onClick={() => connect()}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 text-black">
          <Dialog.Panel className="flex flex-col w-full max-w-md text-white bg-primary rounded-3xl border-[1px] border-opacity-25 border-offwhite shadow-md">
            <div className="flex flex-col gap-4 px-4 py-6">
              <div className="flex flex-row items-center justify-between">
                <h3>Select a Token</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => setIsOpen(false)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
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
                        <h4>{token.ticker}</h4>
                      </div>
                    )
                )}
              </div>
            </div>
            <div className="h-[1px] w-full border-[1px] border-offwhite border-opacity-25"></div>
            <div className="flex flex-col items-start justify-start w-full gap-4 py-2 overflow-y-auto h-96">
              {Tokens.map((token, i) => {
                return (
                  <div
                    className="flex flex-row items-start mx-4 justify-start gap-4 px-2.5 py-1.5 hover:opacity-60 rounded-full cursor-pointer w-full"
                    key={i}
                  >
                    <Image
                      className="rounded-full"
                      src={token.image}
                      alt={token.name}
                      height="35"
                      width="35"
                    />
                    <div className="flex flex-col">
                      <h4>{token.name}</h4>
                      <h5 className="text-sm text-offwhite">{token.ticker}</h5>
                    </div>
                  </div>
                );
              })}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </section>
  );
};

export default Swap;
