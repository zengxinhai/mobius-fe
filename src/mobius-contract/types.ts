export type UserReserveData = {
  underlyingBalance: string
  variableBorrows: string
  borrowableAmount: string
  reserve: ReserveData
};

export type ReserveData = {
  id: string;
  name: string;
  symbol: string;
  iconSymbol: string;
  underlyingAsset: string;
  priceInUSD: string;
  totalLiquidity: string;
  unborrowedLiquidity: string;
  supplyCap: string;
  supplyAPY: string;
  totalDebt: string;
  totalDebtUSD: string;
  borrowCap: string;
  borrowCapUSD: string;
  borrowUsageRatio: string;
  borrowRateMode: 'Variable' | 'Stable';
  variableBorrowRate: string;
  variableBorrowAPY: string;
  availableBorrows: string;
  availableBorrowsInUSD: string;
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
  assetId: string
  netWorthUSD: string
  netAPY: string
  earnedAPY: string
  debtAPY: string
  healthFactor: string
  currentLoanToValue: string
  currentLiquidationThreshold: string
  loanToValue: string
  totalLiquidityUSD: string
  totalCollateralUSD: string
  totalBorrowsUSD: string
  claimableRewardsUSD: string
}

export type PlatformAssetOverview = {
  totalMarketSizeUSD: string
  totalBorrowsUSD: string
  totalAvailableUSD: string
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
  totalLiquidity: '0',
  unborrowedLiquidity: '0',
  supplyCap: '0',
  supplyAPY: '',
  totalDebt: '0',
  borrowCap: '1000000000000000000000000', // Infinite
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
