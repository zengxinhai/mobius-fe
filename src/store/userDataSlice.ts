import { StateCreator } from 'zustand'
import { RootState } from './root'
import { WalletBalance } from './types'

export interface UserDataSlice {
  account: string;
  walletBalances: Record<string, WalletBalance>;
  setAccount: (account: string | undefined) => void;
  setWalletBalances: (_balances: Record<string, WalletBalance>) => void;
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
    setAccount: (account) => set({ account }),
    setWalletBalances: (_balances: Record<string, WalletBalance>) => set({ walletBalances: _balances }),
  }
}
