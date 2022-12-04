import { StateCreator } from 'zustand'
import { RootState } from './root'
import { UserReserveData } from './types'

export interface UserReserveDataSlice {
  userReserves: UserReserveData[]
  setUserReserves: (userReserves: UserReserveData[]) => void
}

export const createUserReserveDataSlice: StateCreator<
  RootState,
  [['zustand/devtools', never]],
  [],
  UserReserveDataSlice
  > = (set, get) => {
  return {
    userReserves: [],
    setUserReserves: (userReserves) => set({ userReserves })
  }
}
