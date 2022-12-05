import { StateCreator } from 'zustand'
import { RootState } from './root'

const MAIN_NET = "https://fullnode.mainnet.aptoslabs.com";
const TEST_NET = "https://fullnode.testnet.aptoslabs.com";
const DEV_NET = "https://fullnode.devnet.aptoslabs.com";
export interface ProtocolDataSlice {
  chainId: number
  nodeUrl: string
  setNetwork: (chainId: number, _nodeUrl?: string) => void
}

export const createProtocolDataSlice: StateCreator<
  RootState,
  [['zustand/devtools', never]],
  [],
  ProtocolDataSlice
  > = (set, get) => {
  return {
    chainId: 1,
    nodeUrl: MAIN_NET,
    setNetwork: (chainId, _nodeUrl) => {
      const nodeUrl = _nodeUrl || chainId === 1 ? MAIN_NET : chainId === 2 ? TEST_NET : DEV_NET;
      set({ chainId, nodeUrl })
    }
  }
}
