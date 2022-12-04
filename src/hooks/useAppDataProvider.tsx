import React, {useContext, createContext, useEffect} from 'react'
import {useAppDataSubscription, useRootStore} from '../store/root'
import { UserReserveData, ReserveData } from '../store/types'
import {useWeb3Context} from "../libs/Web3Provider";

export type UserData = {
  earnedAPY: number
  debtAPY: number
  netAPY: number
  totalLiquidityUSD: string
  totalCollateralUSD: string
  totalBorrowsUSD: string
  healthFactor: string
};

export interface AppDataContextType {
  loading: boolean;
  reserves: ReserveData[];
  userReserves: UserReserveData[];
  user: UserData;
}

const appDataContext = createContext({} as AppDataContextType);

export const useAppDataContext = () => {
  return useContext(appDataContext)
}

const AppDataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [reserves, userReserves] = useRootStore(state => [state.reserves, state.userReserves, state.refreshAppData]);
  const refreshAppData = useAppDataSubscription();
  useEffect(() => {
    refreshAppData()
  }, [refreshAppData])
  const value: AppDataContextType = {
    user: {
      earnedAPY: 0.06,
      debtAPY: 0.08,
      netAPY: 0.07,
      totalLiquidityUSD: '30000',
      totalCollateralUSD: '20000',
      totalBorrowsUSD: '34000',
      healthFactor: '0.12',
    },
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
