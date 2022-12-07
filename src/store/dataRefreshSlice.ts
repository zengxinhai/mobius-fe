import { StateCreator } from 'zustand'
import { RootState } from './root'
import { getAppData } from '../mobius-contract/formatted-data'

export interface DataRefreshSlice {
  isRefreshingAppData: boolean
  refreshAppData: () => Promise<void>
}

export const createDataRefreshSlice: StateCreator<
  RootState,
  [['zustand/devtools', never]],
  [],
  DataRefreshSlice
  > = (set, get) => {
  const refreshAppData = async () => {
    const account = get().account;
    if (!account) return;
    set({ isRefreshingAppData: true })
    const {
      walletBalances,
      assetOverview,
      reserves,
      userReserves,
      userAssetOverview
    } = await getAppData(account);
    set({ isRefreshingAppData: false })
    

    get().setWalletBalances(walletBalances);
    
    assetOverview && get().setOverview(assetOverview)
    
    get().setReserves(reserves);
    get().setUserReserves(userReserves);
    userAssetOverview && get().setUserAssetsOverview(userAssetOverview);
  }
  return { refreshAppData, isRefreshingAppData: false }
}
