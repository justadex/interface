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
        className="bg-secondary px-6 py-2 text-white rounded-full flex flex-row justify-center items-center gap-2"
        onClick={() => setShow(!show)}
      >
        <Image
          src={"/assets/icons/star-icon.svg"}
          height="20"
          width="20"
          alt="Star Icon"
        />
        0
      </button>
      {show && (
        <div className="absolute right-0 top-24 h-[50rem] z-50 w-80 shadow-2xl rounded-l-2xl bg-primary border border-r-0 border-white/20 text-offwhite">
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
            <div className="flex flex-col justify-center items-center w-full">
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PointsTracker;
