import { StateCreator } from 'zustand'
import { RootState } from './root'
import { btcReserve, aptReserve, ethReserve, ReserveData } from './reserveDataSlice'

export type UserReserveData = {
  underlyingBalance: string
  variableBorrows: string
  reserve: ReserveData
};

export interface UserReserveDataSlice {
  userReserves: UserReserveData[]
  fetchUserReserves: () => Promise<void>
}

export const createUserReserveDataSlice: StateCreator<
  RootState,
  [['zustand/devtools', never]],
  [],
  UserReserveDataSlice
  > = (set, get) => {
  const fetchUserReserves = async() => {
    const r = [
      {
        underlyingBalance: '0.8',
        variableBorrows: '0.21',
        reserve: btcReserve,
      },
      {
        underlyingBalance: '4',
        variableBorrows: '1.52',
        reserve: ethReserve,
      },
      {
        underlyingBalance: '2500',
        variableBorrows: '460.7',
        reserve: aptReserve,
      },
    ]
    set({ userReserves: r })
  }
  return {
    userReserves: [],
    fetchUserReserves,
  }
}
