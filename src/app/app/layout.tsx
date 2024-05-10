import Navbar from "./components/Navbar/Navbar";
import WagmiProviderWrapper from "./components/Wagmi/WagmiProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WagmiProviderWrapper>
        <Navbar />
        {children}
      </WagmiProviderWrapper>
    </>
  );
}
