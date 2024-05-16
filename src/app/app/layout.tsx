import Navbar from "./components/Navbar/Navbar";
import WagmiProviderWrapper from "./components/Wagmi/WagmiProvider";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WagmiProviderWrapper>
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        {children}
      </WagmiProviderWrapper>
    </>
  );
}
