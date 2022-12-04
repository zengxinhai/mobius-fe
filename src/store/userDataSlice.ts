import { StateCreator } from 'zustand'
import { RootState } from './root'

export interface UserDataSlice {
  account: string;
  walletBalances: Record<string, number>;
  setAccount: (account: string | undefined) => void;
  setWalletBalances: (_balances: Record<string, number>) => void;
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
    setWalletBalances: (_balances: Record<string, number>) => set({ walletBalances: _balances }),
  }
}
