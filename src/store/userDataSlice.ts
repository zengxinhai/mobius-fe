import { StateCreator } from 'zustand'
import { RootState } from './root'

export interface UserDataSlice {
  account: string;
  setAccount: (account: string | undefined) => void;
}

export const createUserDataSlice: StateCreator<
  RootState,
  [['zustand/devtools', never]],
  [],
  UserDataSlice
  > = (set, get) => {
  return {
    account: '',
    setAccount: (account) => set({ account }),
  }
}
