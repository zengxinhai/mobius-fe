import { Trans } from '@lingui/macro';
import { Button } from '@mui/material';
import { useModalContext } from 'src/hooks/useModal';

import { ListColumn } from 'src/components/lists/ListColumn';
import { ListAPRColumn } from '../ListAPRColumn';
import { ListButtonsColumn } from '../ListButtonsColumn';
import { ListItemUsedAsCollateral } from '../ListItemUsedAsCollateral';
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
      detailsAddress={underlyingAsset}
      showSupplyCapTooltips
      showDebtCeilingTooltips
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

      <ListColumn>
        <ListItemUsedAsCollateral
          isIsolated={false}
          usageAsCollateralEnabledOnUser={true}
          canBeEnabledAsCollateral={true}
          onToggleSwitch={() => {}}
          data-cy={`collateralStatus`}
        />
      </ListColumn>

      <ListButtonsColumn>
        <Button
          disabled={!isActive}
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
