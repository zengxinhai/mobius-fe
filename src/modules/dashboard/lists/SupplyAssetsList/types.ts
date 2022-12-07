export type SupplyAssetsItem = {
  underlyingAsset: string;
  symbol: string;
  iconSymbol: string;
  name: string;
  walletBalance: string;
  walletBalanceUSD: string;
  availableToDeposit: string;
  availableToDepositUSD: string;
  supplyAPY: string;
  totalLiquidity: string;
  supplyCap: string;
  isActive?: boolean;
};
