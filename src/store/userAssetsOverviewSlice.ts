import { StateCreator } from 'zustand'
import { RootState } from './root'
import { UserAssetsOverview } from './types'

export interface UserAssetsOverviewSlice {
  userAssetsOverview: UserAssetsOverview;
  setUserAssetsOverview: (userAssetsOverview: UserAssetsOverview) => void;
}

const assetsOverview: UserAssetsOverview = {
  netWorthUSD: 0,
  netApy: 0,
  healthFactor: '0',
  currentLoanToValue: '0',
  currentLiquidationThreshold: '0',
  loanToValue: '0',
  claimableRewardsUsd: 0,
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
