import { StateCreator } from 'zustand'
import { RootState } from './root'
import { UserAssetsOverview } from './types'

export interface UserAssetsOverviewSlice {
  userAssetsOverview: UserAssetsOverview;
  setUserAssetsOverview: (userAssetsOverview: UserAssetsOverview) => void;
}

export const createUserAssetsOverviewSlice: StateCreator<
  RootState,
  [['zustand/devtools', never]],
  [],
  UserAssetsOverviewSlice
  > = (set, get) => {
  return {
    userAssetsOverview: {
      assetId: '',
      netWorthUSD: '0',
      borrowPowerUSD: '0',
      netAPY: '0',
      earnedAPY: '0',
      debtAPY: '0',
      currentLoanToValue: '0',
      loanToValue: '0',
      currentLiquidationThreshold: '0',
      totalCollateralUSD: '0',
      totalBorrowsUSD: '0',
      totalLiquidityUSD: '0',
      healthFactor: '0',
      claimableRewardsUSD: '0',
    },
    setUserAssetsOverview: (userAssetsOverview) => set({ userAssetsOverview })
  }
}
