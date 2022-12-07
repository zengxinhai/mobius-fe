import { StateCreator } from 'zustand'
import { RootState } from './root'
import { ReserveData, PlatformAssetOverview } from './types'

export interface ReserveDataSlice {
  overview: PlatformAssetOverview,
  setOverview: (overview: PlatformAssetOverview) => void
  reserves: ReserveData[]
  setReserves: (reserves: ReserveData[]) => void
}

export const createReserveDataSlice: StateCreator<
  RootState,
  [['zustand/devtools', never]],
  [],
  ReserveDataSlice
  > = (set, get) => {
  return {
    reserves: [],
    setReserves: (reserves) => set({reserves}),
    overview: { totalMarketSizeUSD: '0', totalAvailableUSD: '0', totalBorrowsUSD: '0' },
    setOverview: (overview: PlatformAssetOverview) => set({ overview }),
  }
}
