export type BorrowedPositionsItem = {
  name: string;
  isActive: boolean;
  borrowingEnabled: boolean;
  borrowRateMode: string;
  symbol: string;
  iconSymbol: string;
  underlyingAsset: string;
  variableBorrowAPY: string;
  variableBorrows: number | string;
  variableBorrowsUSD: string | number;
  totalBorrows: string | number;
  totalBorrowsUSD: string | number;
};
