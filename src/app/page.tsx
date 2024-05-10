import Image from "next/image";
import Navbar from "./components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center">
        <div>Home</div>
      </div>
    </>
  );
}
