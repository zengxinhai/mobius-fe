import { StateCreator } from 'zustand'
import { RootState } from './root'
import { WalletBalance } from './types'

export interface UserDataSlice {
  account: string;
  walletBalances: Record<string, WalletBalance>;
  setAccount: (account: string | undefined) => void;
  setWalletBalances: (_balances: Record<string, WalletBalance>) => void;
  assetId: number | undefined,
  setAssetId: (id: number | undefined) => void,
}

export const createUserDataSlice: StateCreator<
  RootState,
  [['zustand/devtools', never]],
  [],
  UserDataSlice
  > = (set, get) => {
  return {
    account: '',
    walletBalances: {},
    assetId: undefined,
    setAssetId: (assetId: number | undefined) => set ({assetId}),
    setAccount: (account) => set({ account }),
    setWalletBalances: (_balances: Record<string, WalletBalance>) => set({ walletBalances: _balances }),
  }
}
