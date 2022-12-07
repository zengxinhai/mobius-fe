export type BorrowAssetsItem = {
  id: string;
  symbol: string;
  name: string;
  iconSymbol: string;
  underlyingAsset: string;
  variableBorrowRate: string;
  availableBorrows: string;
  availableBorrowsInUSD: string;
  borrowCap: string;
  totalBorrows: string;
  totalLiquidityUSD: string;
  borrowingEnabled: boolean;
};
