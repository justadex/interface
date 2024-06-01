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
        {userData ? userData.points : 0} Points
      </button>
      {show && (
        <div className="absolute right-0 top-28 h-[50rem] z-50 w-96 shadow-2xl rounded-l-2xl bg-primary border border-r-0 border-white/20 text-offwhite">
          <div className="flex flex-row justify-start items-center h-full">
            <div
              className="h-full flex justify-center items-center w-12 bg-secondary hover:opacity-50 border-r border-white/20 cursor-pointer rounded-l-2xl"
              onClick={() => setShow(false)}
            >
              <svg
                className="h-5 w-5"
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
              <div className="flex flex-col gap-6 justify-start h-full items-center w-full overflow-y-auto px-6 py-12">
                <div className="flex flex-col justify-start items-start w-full">
                  <h2 className=" text-2xl font-semibold mb-4">
                    Points Earned: {userData.points}
                  </h2>
                  <h3 className="font-semibold mb-2">
                    Last Interaction Date:{" "}
                    {moment(userData.lastInteractionDate).format("LL")}
                  </h3>
                </div>
                <div className="flex flex-col gap-4 w-full">
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
                    <h3 className=" font-bold text-lg">Last 5 Transactions</h3>
                  </div>

                  <ul className="list-decimal list-outside ml-4">
                    {userData.transactions.map((transaction, index) => (
                      <li key={index} className="mb-2">
                        <div>{"tokenIn : " + getTokenInfoByAddress(transaction.tokenIn)!.name + " tokenOut : " + getTokenInfoByAddress(transaction.tokenOut)!.name + " AmountIn : " + parseFloat(formatUnits(BigInt(transaction.amountIn), parseInt(getTokenInfoByAddress(transaction.tokenIn)!.decimal))).toFixed(6) + " AmountOut : " + parseFloat(formatUnits(BigInt(transaction.amountOut), parseInt(getTokenInfoByAddress(transaction.tokenIn)!.decimal))).toFixed(6) + moment(transaction.date).format("LLL")}</div>
                        {/* <div>Amount In: {transaction.amountIn}</div>
                        <div>Amount Out: {transaction.amountOut}</div>
                        <div>Token In: {transaction.tokenIn}</div>
                        <div>Token Out: {transaction.tokenOut}</div> */}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center h-full items-center w-full overflow-y-auto p-4">
                <div>No data found for this user.</div>
              </div>
            )}
            {/* <div className="flex flex-col justify-start h-full items-center w-full overflow-y-auto">
              {userData ? (
                <>
                  <h2 className="text-2xl font-semibold mb-4">
                    User Points: {userData.points}
                  </h2>
                  <h3 className="text-xl font-semibold mb-2">
                    Last Interaction Date: {userData.lastInteractionDate}
                  </h3>
                  <h3 className="text-xl font-semibold mb-2">
                    Last 5 Transactions:
                  </h3>
                  <ul className="list-disc list-inside">
                    {userData.transactions.map((transaction, index) => (
                      <li key={index} className="mb-2">
                        <div>
                          Date: {new Date(transaction.date).toLocaleString()}
                        </div>
                        <div>Amount In: {transaction.amountIn}</div>
                        <div>Amount Out: {transaction.amountOut}</div>
                        <div>Token In: {transaction.tokenIn}</div>
                        <div>Token Out: {transaction.tokenOut}</div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div>No data found for this user.</div>
              )}
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default PointsTracker;
