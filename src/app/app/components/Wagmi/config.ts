import { http, createConfig } from "wagmi";
import { mode, hardhat } from "wagmi/chains";

export const config = createConfig({
  chains: [mode, hardhat],
  transports: {
    [mode.id]: http(),
    [hardhat.id]: http(),
  },
});
