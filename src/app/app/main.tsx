"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useReadContract,
  useReadContracts,
} from "wagmi";
import Image from "next/image";
import Tokens from "@/app/app/data/tokens.json";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { YakRouterABI } from "./abi/YakRouterABI";
import { formatEther, formatUnits, Address, erc20Abi } from "viem";
import { useWatchBlocks } from "wagmi";
import { ButtonState, SwapStatus, Token, TradeInfo } from "./types/interface";
import { swapTokens } from "./contractCalls";
import { Toast } from "./components/Toast/Toast";
import {
  buildBalanceCheckParams,
  convertToBigInt,
  formatFloat,
} from "../utils/utils";

import Adapters from "@/app/app/data/adapters.json";

let _tokens: Token[] = Tokens;

const YakRouterAddress = "0x64f1Cd91F37553E5A8718f7D235e5078C962b7e7";
const WETH_ADDRESS: Address = "0x4200000000000000000000000000000000000006";
const EMPTY_ADDRESS: Address = "0x0000000000000000000000000000000000000000";

const Swap = () => {
  const { address, isConnected, chainId } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenOut, setIsOpenOut] = useState(false);
  const [tokenIn, setTokenIn] = useState<Token | undefined>(_tokens[0]);
  const [tokenOut, setTokenOut] = useState<Token | undefined>();
  const [amountIn, setAmountIn] = useState("0");
  const [amountOut, setAmountOut] = useState("0");
  const [tradeInfo, setTradeInfo] = useState<TradeInfo | undefined>();
  const [swapStatus, setSwapStatus] = useState<SwapStatus>("IDLE");

  const [block, setBlock] = useState<string>("");



  const ethBalance = useBalance({
    address: address,
  });

  const {
    data: tokenBalance,
    error: tokenBalanceError,
    isLoading: tokenbalancePending,
    refetch: refreshBalance,
  } = useReadContracts({
    contracts: buildBalanceCheckParams(_tokens, address!),
  });



  const { data, isLoading: quoteLoading, refetch: quoteRefresh } = useReadContract({
    abi: YakRouterABI,
    address: YakRouterAddress,
    functionName: "findBestPath",
    args: [
      amountIn && tokenIn && parseFloat(amountIn)
        ? convertToBigInt(parseFloat(amountIn), parseInt(tokenIn?.decimal))
        : BigInt(0),
      tokenIn?.address === EMPTY_ADDRESS
        ? WETH_ADDRESS
        : (tokenIn?.address as Address),
      tokenOut?.address === EMPTY_ADDRESS
        ? WETH_ADDRESS
        : (tokenOut?.address as Address),
      BigInt("3"),
    ],
  });

  useWatchBlocks({
    blockTag: "latest",
    onBlock(block) {
      setBlock(block.number.toString());
      // refreshBalance();
      quoteRefresh();
    },
  });

  useEffect(() => {
    if (data) {
      if (data?.amounts.length > 0 && tokenOut) {
        setAmountOut(
          formatUnits(
            data?.amounts[data.amounts.length - 1],
            parseInt(tokenOut.decimal)
          )
        );

        const trade = {
          amountIn: data.amounts[0],
          amountOut: data.amounts[data.amounts.length - 1],
          amounts: data.amounts,
          path: data.path,
          pathTokens: data.path.map((pathAddress, index) => {
            return (
              _tokens.find((token) => token.address == pathAddress) ||
              _tokens[0]
            );
          }),
          adapters: data.adapters,
        };
        setTradeInfo(trade);
      } else {
        setAmountOut("0");
      }
    } else {
      setAmountOut("0");
    }
  }, [data, tokenOut]);

  useEffect(() => {
    if (tokenBalance && tokenBalance.length > 0) {
      for (let i = 1; i < tokenBalance.length; i++) {
        const results = tokenBalance[i].result;
        if (results !== undefined) {
          _tokens[i].balance = formatUnits(
            BigInt(results),
            parseInt(_tokens[i].decimal)
          );
        }
      }
      _tokens = [
        _tokens[0],
        ..._tokens
          .slice(1)
          .sort(
            (a, b) =>
              (b.balance ? parseInt(b.balance) : 0) -
              (a.balance ? parseInt(a.balance) : 0)
          ),
      ];
    }
  }, [tokenBalance]);

  useEffect(() => {
    if (ethBalance && ethBalance.status === "success") {
      _tokens[0].balance = formatEther(ethBalance.data.value);
    }
  }, [ethBalance]);

  function getTokenSwapButtonText(): ButtonState {
    if (!isConnected) {
      return { enabled: false, text: "Connect wallet" };
    }
    if (!tokenIn || !tokenOut) {
      return { enabled: false, text: "Select a token" };
    }
    const amountInValue = parseFloat(amountIn);
    const amountOutValue = parseFloat(amountOut);
    if ((amountInValue <= 0 && amountOutValue <= 0) || !amountInValue) {
      return { enabled: false, text: "Enter amount to swap" };
    }
    if (amountInValue && tokenIn?.balance) {
      if (parseFloat(tokenIn.balance) < amountInValue) {
        return { enabled: false, text: "Insufficient Balance" };
      }
    }
    return { enabled: true, text: "Swap" };
  }

  const [searchInput, setSearchInput] = useState("");
  const [filteredTokens, setFilteredTokens] = useState(_tokens);

  const handleSearchChange = (e: string) => {
    const value = e.toLowerCase();
    setSearchInput(value);
    setFilteredTokens(
      _tokens.filter(
        (token) =>
          token.name.toLowerCase().includes(value) ||
          token.ticker.toLowerCase().includes(value) ||
          token.address.toLowerCase().includes(value)
      )
    );
  };

  function getTokenInfoByAddress(address: string): { name: string; icon: string } | undefined {
    if (!address) {
      return undefined;
    }
    const token = Adapters.find(token => token.address.toLowerCase() === address.toLowerCase());
    if (token) {
      return {
        name: token.name,
        icon: token.icon
      };
    } else {
      return undefined;
    }
  }


  return (
    <section className="flex flex-col gap-6 items-center justify-center min-h-screen relative px-8">
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
                type="number"
                placeholder="0"
                min={0}
                value={formatFloat(parseFloat(amountIn))}
                onChange={(e) => {
                  setAmountIn(e.target.value);
                }}
              />

              <button
                className={`flex flex-row items-center justify-center gap-2 px-4 py-1 text-white rounded-full cursor-pointer ${tokenIn ? "bg-gray-600" : "bg-accent"
                  }`}
                onClick={() => setIsOpen(true)}
              >
                {tokenIn && (
                  <Image
                    src={tokenIn?.image}
                    width="22"
                    height="22"
                    alt={tokenIn.name}
                  />
                )}

                <h3 className="font-semibold w-max">
                  {tokenIn ? tokenIn?.ticker : "Select Token"}
                </h3>
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
            {tokenIn && tokenIn.balance && parseFloat(tokenIn.balance) > 0 && (
              <div className="flex flex-row items-center justify-between">
                <div className="text-sm"></div>
                <div className="text-sm cursor-pointer">
                  Balance:{" "}
                  {tokenIn && tokenIn.balance
                    ? formatFloat(parseFloat(tokenIn.balance))
                    : ".."}
                  {amountIn !== tokenIn.balance && (
                    <span
                      className="text-accent font-bold ml-1"
                      onClick={() => {
                        if (tokenIn && tokenIn.balance) {
                          setAmountIn(tokenIn.balance);
                        }
                      }}
                    >
                      Max
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          <div
            className="border-swap"
            onClick={() => {
              let _tokenOut = tokenOut;
              let _tokenIn = tokenIn;
              setTokenIn(_tokenOut!);
              setTokenOut(_tokenIn!);
            }}
          >
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
                type="number"
                placeholder="0"
                min={0}
                onChange={() => { }}
                value={formatFloat(parseFloat(amountOut))}
              />
              <button
                className={`flex flex-row items-center justify-center gap-2 px-4 py-1 text-white rounded-full cursor-pointer ${!tokenOut ? "bg-accent" : "bg-gray-600"
                  }`}
                onClick={() => setIsOpenOut(true)}
              >
                {tokenOut && (
                  <Image
                    src={tokenOut?.image || ""}
                    alt={tokenOut?.name || ""}
                    width={"22"}
                    height={"22"}
                  />
                )}

                <h3 className="font-semibold w-max">
                  {tokenOut ? tokenOut.ticker : "Select token"}
                </h3>
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
            {tokenOut &&
              tokenOut.balance &&
              parseFloat(tokenOut.balance) > 0 && (
                <div className="flex flex-row items-center justify-between ">
                  <div className="text-sm"></div>
                  <div className="text-sm">
                    Balance:{" "}
                    {tokenOut && tokenOut.balance
                      ? formatFloat(parseFloat(tokenOut.balance))
                      : ".."}
                  </div>
                </div>
              )}
          </div>
        </div>
        <div>
          <button
            className="w-full px-8 py-4 text-lg font-semibold rounded-3xl bg-accent/40 text-accent hover:bg-accent/20 disabled:cursor-not-allowed"
            disabled={!getTokenSwapButtonText().enabled}
            onClick={async () => {
              if (tradeInfo && address && tokenIn && tokenOut) {
                try {
                  await swapTokens(
                    (_swapStatus: SwapStatus) => {
                      setSwapStatus(_swapStatus);
                    },
                    tokenIn?.address as `0x{string}`,
                    tokenOut?.address as `0x{string}`,
                    address!,
                    tradeInfo!
                  );
                  setTimeout(() => {
                    setSwapStatus("IDLE");
                  }, 1000);

                  refreshBalance();
                } catch (e) {
                  setSwapStatus("FAILED");
                  setTimeout(() => {
                    setSwapStatus("IDLE");
                  }, 3000);
                }
              }
            }}
          >
            {getTokenSwapButtonText().text}
          </button>
        </div>
      </div>
      {tradeInfo && amountIn && (
        <div className="w-full max-w-lg p-4 rounded-2xl shadow-sm bg-primary border-[1px] border-white/20 text-offwhite">
          <div className="flex flex-row justify-center items-center flex-wrap gap-4">
            {tradeInfo &&
              tradeInfo.pathTokens.map((flow: Token, f: number) => {
                if (
                  tokenIn &&
                  f == 0 &&
                  tradeInfo.path[f] === WETH_ADDRESS &&
                  tokenIn.address === EMPTY_ADDRESS
                ) {
                  flow = _tokens[0];
                }
                if (
                  tokenOut &&
                  f == tradeInfo.path.length - 1 &&
                  tradeInfo.path[f] === WETH_ADDRESS &&
                  tokenOut.address === EMPTY_ADDRESS
                ) {
                  flow = _tokens[0];
                }
                return (
                  <div
                    className="flex flex-row justify-center items-center gap-4"
                    key={f}
                  >
                    <div className="flex flex-col gap-1 justify-center items-center">
                      <Image
                        className=" aspect-square"
                        src={flow.image}
                        width={"25"}
                        height={"25"}
                        alt="ETH"
                      />
                      <h4 className=" font-bold uppercase">{flow.ticker}</h4>
                    </div>
                    <div
                      className={
                        tradeInfo.pathTokens.length === f + 1 ? "hidden" : ""
                      }
                    >
                      <div className="flex flex-col gap-3">
                        <Image
                          src={"/assets/icons/arrow-right-white.svg"}
                          width={"20"}
                          height={"10"}
                          alt="Arrow Right"
                        />
                        {tradeInfo.adapters[f] &&
                          <Image
                            src={getTokenInfoByAddress(tradeInfo.adapters[f])?.icon!}
                            width={"15"}
                            height={"15"}
                            alt="Arrow Right"
                          />
                        }

                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {swapStatus !== "IDLE" && <Toast text={swapStatus} />}

      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="flex flex-col w-full max-w-lg text-white bg-primary rounded-3xl border-[1px] border-opacity-25 border-offwhite shadow-md overflow-clip">
          <div className="flex flex-col gap-4 px-4 pb-2 pt-0">
            <div className="flex flex-row items-center justify-between">
              <DialogTitle>Select a Token</DialogTitle>
            </div>
            <div className="relative">
              <input
                className="w-full px-12 py-2 bg-secondary rounded-2xl focus:outline-none focus:bg-primary border-[1px] border-opacity-25 border-offwhite"
                placeholder="Search a name or paste address"
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
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
            <div className="flex flex-row flex-wrap justify-start items-center gap-2.5">
              {_tokens.map((pop, p) => {
                if (pop.featured) {
                  return (
                    <div
                      className="flex flex-row justify-center items-center gap-2 border-2 border-secondary px-2 py-1 rounded-full cursor-pointer"
                      key={p}
                      onClick={() => {
                        if (tokenOut && pop.address === tokenOut?.address) {
                          setTokenOut(undefined);
                        }
                        setTokenIn(pop);
                        setIsOpen(false);
                      }}
                    >
                      <Image
                        src={pop.image}
                        alt={pop.name}
                        height={"20"}
                        width={"20"}
                      />
                      <p>{pop.ticker}</p>
                    </div>
                  );
                }
              })}
            </div>
          </div>

          <div className="mx-4">
            <div className="h-[1px] w-full border-[1px] border-offwhite border-opacity-25"></div>
          </div>
          <div className="flex flex-col items-start justify-start gap-4 py-2 overflow-y-auto overflow-x-clip scrollbar-thumb-gray-900 scrollbar-thin h-96">
            {filteredTokens.map((token, i) => {
              return (
                <div
                  onClick={() => {
                    if (tokenOut && token.address === tokenOut?.address) {
                      setTokenOut(undefined);
                    }
                    setTokenIn(token);
                    setIsOpen(false);
                  }}
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
                  <div>
                    {token.balance ? formatFloat(parseFloat(token.balance)) : 0}
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpenOut} onOpenChange={() => setIsOpenOut(false)}>
        <DialogContent className="flex flex-col w-full max-w-lg text-white bg-primary rounded-3xl border-[1px] border-opacity-25 border-offwhite shadow-md overflow-clip">
          <div className="flex flex-col gap-4 px-4 pb-2 pt-0">
            <div className="flex flex-row items-center justify-between">
              <DialogTitle>Select a Token</DialogTitle>
            </div>
            <div className="relative">
              <input
                className="w-full px-12 py-2 bg-secondary rounded-2xl focus:outline-none focus:bg-primary border-[1px] border-opacity-25 border-offwhite"
                placeholder="Search a name or paste address"
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
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
            <div className="flex flex-row flex-wrap justify-start items-center gap-2.5">
              {_tokens.map((pop, p) => {
                if (pop.featured) {
                  return (
                    <div
                      className="flex flex-row justify-center items-center gap-2 border-2 border-secondary px-2 py-1 rounded-full cursor-pointer"
                      key={p}
                      onClick={() => {
                        if (tokenIn && pop.address === tokenIn?.address) {
                          setTokenIn(undefined);
                        }
                        setTokenOut(pop);
                        setIsOpenOut(false);
                      }}
                    >
                      <Image
                        src={pop.image}
                        alt={pop.name}
                        height={"20"}
                        width={"20"}
                      />
                      <p>{pop.ticker}</p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="mx-4">
            <div className="h-[1px] w-full border-[1px] border-offwhite border-opacity-25"></div>
          </div>
          <div className="flex flex-col items-start justify-start gap-4 py-2 overflow-y-auto overflow-x-clip scrollbar-thumb-gray-900 scrollbar-thin h-96">
            {filteredTokens.map((token, i) => {
              return (
                <div
                  onClick={() => {
                    if (tokenIn && token.address === tokenIn?.address) {
                      setTokenIn(undefined);
                    }
                    setTokenOut(token);
                    setIsOpenOut(false);
                  }}
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
                  <div>
                    {token.balance ? formatFloat(parseFloat(token.balance)) : 0}
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
      {block && (
        <div className="fixed bottom-4 right-4 text-xs text-green flex flex-row justify-center items-center gap-1">
          <div className="h-2.5 w-2.5 bg-green rounded-full animate-pulse"></div>
          <div>{block}</div>
        </div>
      )}
    </section>
  );
};

export default Swap;
