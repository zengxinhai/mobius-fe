import React, {useContext, createContext, useEffect} from 'react'
import {useAppDataSubscription, useRootStore} from '../store/root'
import { UserReserveData, ReserveData, UserAssetsOverview } from '../store/types'
import {useWeb3Context} from "../libs/Web3Provider";
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
  const [reserves, userReserves, userAssetOverview] = useRootStore(state => [state.reserves, state.userReserves, state.userAssetsOverview]);
  const refreshAppData = useAppDataSubscription();
  useEffect(() => {
    refreshAppData()
  }, [refreshAppData])
  const value: AppDataContextType = {
    user: userAssetOverview,
    reserves,
    userReserves,
    loading: false
  }
  return (
    <appDataContext.Provider value={value}>
      { children }
    </appDataContext.Provider>
  )
}

export default AppDataProvider;
