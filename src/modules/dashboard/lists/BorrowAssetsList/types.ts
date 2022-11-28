export type BorrowAssetsItem = {
  id: string;
  symbol: string;
  name: string;
  iconSymbol: string;
  underlyingAsset: string;
  variableBorrowRate: number | string;
  availableBorrows: number | string;
  availableBorrowsInUSD: number | string;
  borrowCap: string;
  totalBorrows: string;
  totalLiquidityUSD: string;
  borrowingEnabled: boolean;
};
