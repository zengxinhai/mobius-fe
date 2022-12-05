export type UserReserveData = {
  underlyingBalance: string
  variableBorrows: string
  reserve: ReserveData
};

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

export type UserAssetsOverview = {
  netWorthUSD: number
  netApy: number
  healthFactor: string
  currentLoanToValue: string
  currentLiquidationThreshold: string
  loanToValue: string
  claimableRewardsUsd: number
}

export type WalletBalance = {
  amount: string
  amountUSD: string
}

export const emptyReserve: ReserveData = {
  id: '',
  name: '',
  symbol: '',
  iconSymbol: '',
  underlyingAsset: '',
  priceInUSD: '',
  totalLiquidity: 0,
  unborrowedLiquidity: 0,
  supplyCap: 0,
  supplyAPY: '',
  totalDebt: 0,
  borrowCap: 10 ** 30, // Infinite
  borrowUsageRatio: '',
  borrowRateMode: 'Variable',
  variableBorrowRate: '',
  availableBorrows: '',
  availableBorrowsInUSD: '',
  totalBorrows: '',
  totalLiquidityUSD: '',
  borrowingEnabled: true,
  isActive: true,
  liquidationThreshold: '0.8',
  liquidationBonus: '0.05',
  reserveFactor: '0.2',
  borrowCapUSD: '5200000000000',
  variableBorrowAPY: '',
  totalDebtUSD: '',
  decimals: 9,
}
