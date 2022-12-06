import React, {useContext, createContext, useEffect} from 'react'
import {useAppDataSubscription, useRootStore} from '../store/root'
import { UserReserveData, ReserveData, UserAssetsOverview } from '../store/types'
export interface AppDataContextType {
  loading: boolean;
  reserves: ReserveData[];
  userReserves: UserReserveData[];
  user: UserAssetsOverview;
}

const appDataContext = createContext({} as AppDataContextType);

export const useAppDataContext = () => {
  return useContext(appDataContext)
}

const AppDataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [reserves, userReserves, userAssetOverview, loading]
    = useRootStore(state => [state.reserves, state.userReserves, state.userAssetsOverview, state.isRefreshingAppData]);
  const refreshAppData = useAppDataSubscription();
  useEffect(() => {
    refreshAppData()
  }, [refreshAppData])
  const value: AppDataContextType = {
    user: userAssetOverview,
    reserves,
    userReserves,
    loading,
  }
  return (
    <appDataContext.Provider value={value}>
      { children }
    </appDataContext.Provider>
  )
}

export default AppDataProvider;
