export type SupplyAssetsItem = {
  underlyingAsset: string;
  symbol: string;
  iconSymbol: string;
  name: string;
  walletBalance: string;
  walletBalanceUSD: string;
  availableToDeposit: string;
  availableToDepositUSD: string;
  supplyAPY: number | string;
  totalLiquidity: string;
  supplyCap: string;
  isActive?: boolean;
  usageAsCollateralEnabledOnUser: boolean;
  detailsAddress: string;
};
