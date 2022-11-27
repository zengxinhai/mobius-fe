export type BorrowedPositionsItem = {
  name: string;
  isActive: boolean;
  borrowingEnabled: boolean;
  borrowRateMode: string;
  symbol: string;
  iconSymbol: string;
  underlyingAsset: string;
  variableBorrowAPY: string;
  variableBorrows: number;
  variableBorrowsUSD: string;
  totalBorrows: string;
  totalBorrowsUSD: string;
};
