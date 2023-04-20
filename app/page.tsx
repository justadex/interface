import Image from "next/image";

import Navbar from "./components/landing/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center min-h-screen">
        <h1>Main Landing</h1>
      </main>
    </>
  );
}
