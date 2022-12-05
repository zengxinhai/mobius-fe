import { Trans } from '@lingui/macro';
import { Button } from '@mui/material';
import { useModalContext } from 'src/hooks/useModal';

import { ListAPRColumn } from '../ListAPRColumn';
import { ListButtonsColumn } from '../ListButtonsColumn';
import { ListItemWrapper } from '../ListItemWrapper';
import { ListValueColumn } from '../ListValueColumn';
import { SupplyPositionItem } from './types';

export const SuppliedPositionsListItem = ({
  underlyingBalance,
  underlyingBalanceUSD,
  underlyingAsset,
  ...reserve
}: SupplyPositionItem) => {
  const { isActive } = reserve;
  const { openSupply, openWithdraw } = useModalContext();

  return (
    <ListItemWrapper
      symbol={reserve.symbol}
      iconSymbol={reserve.iconSymbol}
      name={reserve.name}
    >
      <ListValueColumn
        symbol={reserve.iconSymbol}
        value={Number(underlyingBalance)}
        subValue={Number(underlyingBalanceUSD)}
        disabled={Number(underlyingBalance) === 0}
      />

      <ListAPRColumn
        value={Number(reserve.supplyAPY)}
        incentives={[]}
        symbol={reserve.symbol}
      />

      <ListButtonsColumn>
        <Button
          disabled={!isActive || Number(underlyingBalance) <= 0}
          variant="contained"
          onClick={() => openWithdraw(underlyingAsset)}
        >
          <Trans>Withdraw</Trans>
        </Button>

        <Button
          disabled={!isActive}
          variant="outlined"
          onClick={() => openSupply(underlyingAsset)}
        >
          <Trans>Supply</Trans>
        </Button>
      </ListButtonsColumn>
    </ListItemWrapper>
  );
};
