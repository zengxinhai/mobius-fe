import { ReactNode } from 'react';

import { ListMobileItem } from 'src/components/lists/ListMobileItem';

interface ListMobileItemWrapperProps {
  symbol?: string;
  iconSymbol?: string;
  name?: string;
  underlyingAsset?: string;
  children: ReactNode;
  loading?: boolean;
  frozen?: boolean;
  showSupplyCapTooltips?: boolean;
  showBorrowCapTooltips?: boolean;
  showDebtCeilingTooltips?: boolean;
}

export const ListMobileItemWrapper = ({
  symbol,
  iconSymbol,
  name,
  children,
  underlyingAsset,
  loading,
  showSupplyCapTooltips = false,
  showBorrowCapTooltips = false,
  showDebtCeilingTooltips = false,
}: ListMobileItemWrapperProps) => {
  return (
    <ListMobileItem
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      underlyingAsset={underlyingAsset}
      loading={loading}
      showSupplyCapTooltips={showSupplyCapTooltips}
      showBorrowCapTooltips={showBorrowCapTooltips}
      showDebtCeilingTooltips={showDebtCeilingTooltips}
    >
      {children}
    </ListMobileItem>
  );
};
