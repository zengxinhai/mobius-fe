import { StateCreator } from 'zustand'
import { RootState } from './root'
import { DEV_NET } from 'src/aptos/config'

export interface ProtocolDataSlice {
  chainId: number;
  nodeUrl: string;
}

export const createProtocolDataSlice: StateCreator<
  RootState,
  [['zustand/devtools', never]],
  [],
  ProtocolDataSlice
  > = (set, get) => {
  return {
    chainId: DEV_NET.chainId,
    nodeUrl: DEV_NET.nodeUrl
  }
}
