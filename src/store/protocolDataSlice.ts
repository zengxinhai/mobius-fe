import { StateCreator } from 'zustand'
import { RootState } from './root'

const MAIN_NET = "https://fullnode.mainnet.aptoslabs.com";
const TEST_NET = "https://fullnode.testnet.aptoslabs.com";
const DEV_NET = "https://fullnode.devnet.aptoslabs.com";
export interface ProtocolDataSlice {
  nodeUrl: string
  setNetwork: (networkName: string) => void
}

export const createProtocolDataSlice: StateCreator<
  RootState,
  [['zustand/devtools', never]],
  [],
  ProtocolDataSlice
  > = (set, get) => {
  return {
    nodeUrl: MAIN_NET,
    setNetwork: (networkName) => {
      const nodeUrl =
        networkName === 'Mainnet'
          ? MAIN_NET
          : networkName === 'Testnet'
          ? TEST_NET
          : DEV_NET
      set({ nodeUrl })
    }
  }
}
