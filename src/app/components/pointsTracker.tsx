import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import { collection, doc, getDoc, getFirestore, limit, onSnapshot, orderBy, query, startAfter, where } from 'firebase/firestore';



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
                console.log(walletAddress)
                const db = getFirestore(app);
                const docRef = doc(db, "users", walletAddress.toLowerCase());
                const docSnap = await getDoc(docRef);
                const _userData: UserData = docSnap.data()! as UserData;
                setUserData(_userData);
            } catch (error) {
                console.log(error);
                console.error('Error fetching user data:', error);
                setUserData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [walletAddress]);

    if (!walletAddress) return null;
    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-4 bg-white text-black shadow rounded-lg">
            {userData ? (
                <>
                    <h2 className="text-2xl font-semibold mb-4">User Points: {userData.points}</h2>
                    <h3 className="text-xl font-semibold mb-2">Last Interaction Date: {userData.lastInteractionDate}</h3>
                    <h3 className="text-xl font-semibold mb-2">Last 5 Transactions:</h3>
                    <ul className="list-disc list-inside">
                        {userData.transactions.map((transaction, index) => (
                            <li key={index} className="mb-2">
                                <div>Date: {new Date(transaction.date).toLocaleString()}</div>
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
    );
};

export default PointsTracker;
