import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import Image from "next/image";
import moment from "moment";
import { getTokenInfoByAddress } from "../utils/utils";
import { formatUnits } from "viem";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Transaction = {
  date: string;
  amountIn: string;
  amountOut: string;
  tokenIn: string;
  tokenOut: string;
};

type UserData = {
  points: number;
  lastInteractionDate: string;
  transactions: Transaction[];
};

type PointsTrackerProps = {
  walletAddress?: string | null;
};

const PointsTracker: React.FC<PointsTrackerProps> = ({ walletAddress }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!walletAddress) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        let app;
        // Initialize Firebase if not already initialized
        if (!firebase.apps.length) {
          app = initializeApp({
            apiKey: "AIzaSyA4cA6aY909NVtLndDjZ8VT6aE4p6WSlfI",
            authDomain: "jadpointstracker.firebaseapp.com",
            projectId: "jadpointstracker",
            storageBucket: "jadpointstracker.appspot.com",
            messagingSenderId: "265789759494",
            appId: "1:265789759494:web:e2b553dafda09f7525e387",
            measurementId: "G-SWPQK2HM1B",
          });
        } else {
          app = firebase.apps[0];
        }
        console.log(walletAddress);
        const db = getFirestore(app);
        const docRef = doc(db, "users", walletAddress.toLowerCase());
        const docSnap = await getDoc(docRef);
        const _userData: UserData = docSnap.data()! as UserData;
        setUserData(_userData);
      } catch (error) {
        console.log(error);
        console.error("Error fetching user data:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [walletAddress]);

  if (!walletAddress) return null;

  return (
    <>
      <button
        className="bg-secondary px-6 py-2 text-white rounded-full flex flex-row justify-center items-center gap-2 font-semibold"
        onClick={() => setShow(!show)}
      >
        <Image
          src={"/assets/icons/star-icon.svg"}
          height="20"
          width="20"
          alt="Star Icon"
        />
        {userData ? userData.points : 0} XP
      </button>
      {show && (
        <div className="fixed right-0 top-0 flex justify-center items-center z-50 h-dvh">
          <div className=" h-5/6 md:h-[50rem] max-w-[90vw] md:w-96 shadow-2xl rounded-l-2xl border border-r-0 border-white/20 text-offwhite">
            <div className="flex flex-row justify-start items-center h-full">
              <div
                className="h-full flex justify-center items-center w-12 bg-secondary hover:opacity-90 border-r border-white/20 cursor-pointer rounded-l-2xl"
                onClick={() => setShow(false)}
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.95 1.50005C12.95 1.25152 12.7485 1.05005 12.5 1.05005C12.2514 1.05005 12.05 1.25152 12.05 1.50005L12.05 13.5C12.05 13.7486 12.2514 13.95 12.5 13.95C12.7485 13.95 12.95 13.7486 12.95 13.5L12.95 1.50005ZM6.5683 3.93188C6.39257 3.75614 6.10764 3.75614 5.93191 3.93188C5.75617 4.10761 5.75617 4.39254 5.93191 4.56827L8.41371 7.05007L0.499984 7.05007C0.251456 7.05007 0.0499847 7.25155 0.0499847 7.50007C0.0499846 7.7486 0.251457 7.95007 0.499984 7.95007L8.41371 7.95007L5.93191 10.4319C5.75617 10.6076 5.75617 10.8925 5.93191 11.0683C6.10764 11.244 6.39257 11.244 6.56831 11.0683L9.8183 7.81827C9.99404 7.64254 9.99404 7.35761 9.8183 7.18188L6.5683 3.93188Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    data-darkreader-inline-fill=""
                  ></path>
                </svg>
              </div>
              {userData ? (
                <div className="flex flex-col gap-12 justify-start h-full items-center w-full px-6 py-12 bg-primary">
                  <div className="flex flex-col p-4 card-bg text-white shadow-lg rounded-xl w-full">
                    <div className="flex flex-row justify-between items-center ">
                      <div className="flex flex-col justify-start items-start">
                        <h2 className=" font-medium">XP Earned</h2>
                        <h3 className=" text-7xl font-black">
                          {userData.points}
                        </h3>
                      </div>
                      <Image
                        src={"/assets/icons/star-icon.svg"}
                        width={"60"}
                        height={"60"}
                        alt="Star Icon"
                      />
                    </div>
                    <h4 className="text-xs mt-1">
                      Last Transaction:{" "}
                      {moment(userData.lastInteractionDate).format("LL")}
                    </h4>
                  </div>

                  <div className="flex flex-col w-full h-full">
                    <div className="flex flex-row justify-start items-center gap-2">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.15 7.49998C13.15 4.66458 10.9402 1.84998 7.50002 1.84998C4.7217 1.84998 3.34851 3.90636 2.76336 4.99997H4.5C4.77614 4.99997 5 5.22383 5 5.49997C5 5.77611 4.77614 5.99997 4.5 5.99997H1.5C1.22386 5.99997 1 5.77611 1 5.49997V2.49997C1 2.22383 1.22386 1.99997 1.5 1.99997C1.77614 1.99997 2 2.22383 2 2.49997V4.31318C2.70453 3.07126 4.33406 0.849976 7.50002 0.849976C11.5628 0.849976 14.15 4.18537 14.15 7.49998C14.15 10.8146 11.5628 14.15 7.50002 14.15C5.55618 14.15 3.93778 13.3808 2.78548 12.2084C2.16852 11.5806 1.68668 10.839 1.35816 10.0407C1.25306 9.78536 1.37488 9.49315 1.63024 9.38806C1.8856 9.28296 2.17781 9.40478 2.2829 9.66014C2.56374 10.3425 2.97495 10.9745 3.4987 11.5074C4.47052 12.4963 5.83496 13.15 7.50002 13.15C10.9402 13.15 13.15 10.3354 13.15 7.49998ZM7 10V5.00001H8V10H7Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          data-darkreader-inline-fill=""
                        ></path>
                      </svg>
                      <h3 className=" font-bold text-lg">
                        Recent Transactions
                      </h3>
                    </div>

                    <ul className=" overflow-y-auto h-64 md:h-full pr-4">
                      {userData.transactions.map((transaction, index) => (
                        <li
                          className="flex flex-row justify-between items-center gap-2 border-b border-white/10 last:border-b-0 py-4"
                          key={index}
                        >
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-row justify-start items-center">
                              <div className="flex flex-row justify-start items-center gap-3 w-full">
                                <div className="flex flex-row justify-start items-center gap-2">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <div className="flex justify-center items-center">
                                          <Image
                                            src={
                                              getTokenInfoByAddress(
                                                transaction.tokenIn
                                              )!.icon || ""
                                            }
                                            alt={
                                              getTokenInfoByAddress(
                                                transaction.tokenIn
                                              )!.name
                                            }
                                            width={"20"}
                                            height={"20"}
                                          />
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-secondary">
                                        <p>
                                          {
                                            getTokenInfoByAddress(
                                              transaction.tokenIn
                                            )!.name
                                          }
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>

                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <div className="max-w-12 md:max-w-16 truncate">
                                          {parseFloat(
                                            formatUnits(
                                              BigInt(transaction.amountIn),
                                              parseInt(
                                                getTokenInfoByAddress(
                                                  transaction.tokenIn
                                                )!.decimal
                                              )
                                            )
                                          ).toFixed(6)}
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-secondary">
                                        <p>
                                          {parseFloat(
                                            formatUnits(
                                              BigInt(transaction.amountIn),
                                              parseInt(
                                                getTokenInfoByAddress(
                                                  transaction.tokenIn
                                                )!.decimal
                                              )
                                            )
                                          ).toFixed(6)}
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                                <div>
                                  <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                                      fill="currentColor"
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      data-darkreader-inline-fill=""
                                    ></path>
                                  </svg>
                                </div>
                                <div className="flex flex-row justify-start items-center gap-2">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <div className="flex justify-center items-center">
                                          <Image
                                            src={
                                              getTokenInfoByAddress(
                                                transaction.tokenOut
                                              )!.icon || ""
                                            }
                                            alt={
                                              getTokenInfoByAddress(
                                                transaction.tokenOut
                                              )!.name
                                            }
                                            width={"20"}
                                            height={"20"}
                                          />
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-secondary">
                                        <p>
                                          {
                                            getTokenInfoByAddress(
                                              transaction.tokenOut
                                            )!.name
                                          }
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        {" "}
                                        <div className="max-w-12 md:max-w-16 truncate">
                                          {parseFloat(
                                            formatUnits(
                                              BigInt(transaction.amountOut),
                                              parseInt(
                                                getTokenInfoByAddress(
                                                  transaction.tokenOut
                                                )!.decimal
                                              )
                                            )
                                          ).toFixed(6)}
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-secondary">
                                        <p>
                                          {parseFloat(
                                            formatUnits(
                                              BigInt(transaction.amountOut),
                                              parseInt(
                                                getTokenInfoByAddress(
                                                  transaction.tokenOut
                                                )!.decimal
                                              )
                                            )
                                          ).toFixed(6)}
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </div>
                            </div>
                            <p className="text-xs">
                              {moment(transaction.date).format("LLL")}
                            </p>
                          </div>
                          <h5 className="font-bold">+5</h5>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2 justify-center h-full items-center w-full p-4 bg-primary text-center">
                  <h3 className="text-3xl font-bold">No data found.</h3>
                  <h4>
                    Perform atleast one transaction to start seeing your points.
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PointsTracker;
