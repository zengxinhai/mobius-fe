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
};

export interface ReserveDataSlice {
  reserves: ReserveData[]
  fetchReserves: () => Promise<void>
}

export const createReserveDataSlice: StateCreator<
  RootState,
  [['zustand/devtools', never]],
  [],
  ReserveDataSlice
  > = (set, get) => {
  return {
    reserves: [],
    fetchReserves: async () => {}
  }
}
