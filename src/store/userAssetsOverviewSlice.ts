import { StateCreator } from 'zustand'
import { RootState } from './root'
import { UserAssetsOverview } from './types'

export interface UserAssetsOverviewSlice {
  userAssetsOverview: UserAssetsOverview;
  setUserAssetsOverview: (userAssetsOverview: UserAssetsOverview) => void;
}

const assetsOverview: UserAssetsOverview = {
  netWorthUSD: 52000000,
  netApy: 0.12,
  healthFactor: '12',
  currentLoanToValue: '6830000.34',
  currentLiquidationThreshold: '95440023',
  loanToValue: '4220000.12',
  claimableRewardsUsd: 390120,
}

export const createUserAssetsOverviewSlice: StateCreator<
  RootState,
  [['zustand/devtools', never]],
  [],
  UserAssetsOverviewSlice
  > = (set, get) => {
  return {
    userAssetsOverview: assetsOverview,
    setUserAssetsOverview: (userAssetsOverview) => set({ userAssetsOverview })
  }
}
