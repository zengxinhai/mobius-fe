import { StateCreator } from 'zustand'
import { RootState } from './root'

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
  totalDebtUSD: string;
  borrowCap: number;
  borrowCapUSD: string;
  borrowUsageRatio: string;
  borrowRateMode: 'Variable' | 'Stable';
  variableBorrowRate: number | string;
  variableBorrowAPY: string;
  availableBorrows: number | string;
  availableBorrowsInUSD: number | string;
  totalBorrows: string;
  totalLiquidityUSD: string;
  borrowingEnabled: boolean;
  isActive: boolean;
  priceOracle?: string;
  liquidationThreshold: string;
  liquidationBonus: string;
  reserveFactor: string;
  decimals: number;
};

export interface ReserveDataSlice {
  reserves: ReserveData[]
  loadingReserves: boolean
  fetchReserves: () => Promise<void>
}

export const btcReserve: ReserveData = {
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
  borrowUsageRatio: '0.2',
  borrowRateMode: 'Variable',
  variableBorrowRate: '0.06',
  availableBorrows: '500',
  availableBorrowsInUSD: '6800000',
  totalBorrows: '2400',
  totalLiquidityUSD: '9800000',
  borrowingEnabled: true,
  isActive: true,
  liquidationThreshold: '0.85',
  liquidationBonus: '0.05',
  reserveFactor: '0.2',
  borrowCapUSD: '52000000',
  variableBorrowAPY: '0.02',
  totalDebtUSD: '32999999',
  decimals: 9,
}

export const ethReserve: ReserveData = {
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
  borrowUsageRatio: '0.32',
  borrowRateMode: 'Variable',
  variableBorrowRate: '0.08',
  availableBorrows: '7200',
  availableBorrowsInUSD: '8340000',
  totalBorrows: '13000',
  totalLiquidityUSD: '32000000',
  borrowingEnabled: true,
  isActive: true,
  liquidationThreshold: '0.85',
  liquidationBonus: '0.05',
  reserveFactor: '0.2',
  borrowCapUSD: '82000000',
  variableBorrowAPY: '0.025',
  totalDebtUSD: '82495045',
  decimals: 9,
}

export const aptReserve: ReserveData = {
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
  borrowUsageRatio: '0.46',
  variableBorrowRate: '0.12',
  borrowRateMode: 'Variable',
  availableBorrows: '1700000',
  availableBorrowsInUSD: '8620000',
  totalBorrows: '2250000',
  totalLiquidityUSD: '17100000',
  borrowingEnabled: true,
  isActive: true,
  liquidationThreshold: '0.75',
  liquidationBonus: '0.08',
  reserveFactor: '0.2',
  borrowCapUSD: '12000000',
  variableBorrowAPY: '0.04',
  totalDebtUSD: '6938123834',
  decimals: 9,
}


export const createReserveDataSlice: StateCreator<
  RootState,
  [['zustand/devtools', never]],
  [],
  ReserveDataSlice
  > = (set, get) => {
  return {
    reserves: [],
    loadingReserves: false,
    fetchReserves: async () => set({reserves: [btcReserve, ethReserve, aptReserve]})
  }
}
