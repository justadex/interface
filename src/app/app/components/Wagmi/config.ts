import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http, createConfig } from "wagmi";
import { mode, hardhat } from "wagmi/chains";

// export const config = createConfig({
//   chains: [mode, hardhat],
//   transports: {
//     [mode.id]: http(),
//     [hardhat.id]: http(),
//   },
// });


export const config = getDefaultConfig({
  appName: "Just a Dex",
  projectId: "YOUR_PROJECT_ID",
  chains: [mode],
  ssr: true, // If your dApp uses server side rendering (SSR)
});