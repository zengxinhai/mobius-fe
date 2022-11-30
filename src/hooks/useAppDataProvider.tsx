import React, { useContext, createContext } from 'react'

export type ReserveData = {
  id: string;
  name: string;
  symbol: string;
  iconSymbol: string;
  underlyingAsset: string;
  priceInUSD: string;
  totalLiquidity: number;
  unborrowedLiquidity: number;
  supplyCap: number;
  supplyAPY: string;
  totalDebt: number;
  borrowCap: number;
  variableBorrowRate: number | string;
  availableBorrows: number | string;
  availableBorrowsInUSD: number | string;
  totalBorrows: string;
  totalLiquidityUSD: string;
  borrowingEnabled: boolean;
  isActive: boolean;
};

export type UserReserveData = {
  underlyingBalance: string;
  variableBorrows: string;
  reserve: ReserveData;
};

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

const btcReserve = {
  id: '1',
  name: 'Bitcoin',
  symbol: 'BTC',
  iconSymbol: 'BTC',
  underlyingAsset: '0x1::coin::Bitcoin',
  priceInUSD: '16521',
  totalLiquidity: 30000000,
  unborrowedLiquidity: 8200000,
  supplyCap: 20000,
  supplyAPY: '0.04',
  totalDebt: 2500,
  borrowCap: 2600,
  variableBorrowRate: '0.06',
  availableBorrows: '500',
  availableBorrowsInUSD: '6800000',
  totalBorrows: '2400',
  totalLiquidityUSD: '9800000',
  borrowingEnabled: true,
  isActive: true,
}

const ethReserve = {
  id: '2',
  name: 'Ethereum',
  symbol: 'ETH',
  iconSymbol: 'ETH',
  underlyingAsset: '0x1::coin::Ethereum',
  priceInUSD: '1231',
  totalLiquidity: 25000000,
  unborrowedLiquidity: 13200000,
  supplyCap: 200000,
  supplyAPY: '0.06',
  totalDebt: 13333,
  borrowCap: 6066,
  variableBorrowRate: '0.08',
  availableBorrows: '7200',
  availableBorrowsInUSD: '8340000',
  totalBorrows: '13000',
  totalLiquidityUSD: '32000000',
  borrowingEnabled: true,
  isActive: true,
}

const aptReserve = {
  id: '3',
  name: 'Aptos',
  symbol: 'APT',
  iconSymbol: 'APT',
  underlyingAsset: '0x1::coin::Aptos',
  priceInUSD: '4.82',
  totalLiquidity: 4000000,
  unborrowedLiquidity: 3200000,
  supplyCap: 80000000,
  supplyAPY: '0.08',
  totalDebt: 2300000,
  borrowCap: 3000000,
  variableBorrowRate: '0.12',
  availableBorrows: '1700000',
  availableBorrowsInUSD: '8620000',
  totalBorrows: '2250000',
  totalLiquidityUSD: '17100000',
  borrowingEnabled: true,
  isActive: true,
}

const reserves: ReserveData[] = [ btcReserve, ethReserve, aptReserve ];

const userReserves: UserReserveData[] = [
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
    reserve: ethReserve
  }
];

const AppDataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
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
