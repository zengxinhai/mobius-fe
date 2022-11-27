import React, { useContext, createContext } from 'react'

export type ReserveData = {
  symbol: string;
  iconSymbol: string;
  underlyingAsset: string;
  totalLiquidity: number;
  supplyCap: number;
  totalDebt: number;
  borrowCap: number;
};

export type UserData = {
  earnedAPY: number
  debtAPY: number
  netAPY: number
  totalLiquidityUSD: string
  totalCollateralUSD: string
  totalBorrowsUSD: string
};

export interface AppDataContextType {
  loading: boolean;
  reserves: ReserveData[];
  user: UserData;
}

const appDataContext = createContext({} as AppDataContextType);

export const useAppDataContext = () => {
  return useContext(appDataContext)
}

const AppDataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const reserves: ReserveData[] = [
    {
      symbol: 'BTC',
      iconSymbol: 'BTC',
      underlyingAsset: '0x1::coin::Bitcoin',
      totalLiquidity: 3000,
      supplyCap: 2000,
      totalDebt: 2500,
      borrowCap: 2600
    },
    {
      symbol: 'ETH',
      iconSymbol: 'ETH',
      underlyingAsset: '0x1::coin::Ethereum',
      totalLiquidity: 25000,
      supplyCap: 20000,
      totalDebt: 13333,
      borrowCap: 6066,
    }
  ];
  const value: AppDataContextType = {
    user: {
      earnedAPY: 0.06,
      debtAPY: 0.08,
      netAPY: 0.07,
      totalLiquidityUSD: '30000',
      totalCollateralUSD: '20000',
      totalBorrowsUSD: '34000',
    },
    reserves,
    loading: false
  }
  return (
    <appDataContext.Provider value={value}>
      { children }
    </appDataContext.Provider>
  )
}

export default AppDataProvider;
