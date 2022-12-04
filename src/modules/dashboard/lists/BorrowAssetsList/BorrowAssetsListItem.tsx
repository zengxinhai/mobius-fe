import { Trans } from '@lingui/macro';
import { Button } from '@mui/material';
import { useModalContext } from 'src/hooks/useModal';

import { CapsHint } from 'src/components/caps/CapsHint';
import { CapType } from 'src/components/caps/helper';
import {Link, ROUTES} from 'src/components/primitives/Link';
import { ListAPRColumn } from '../ListAPRColumn';
import { ListButtonsColumn } from '../ListButtonsColumn';
import { ListItemWrapper } from '../ListItemWrapper';
import { ListValueColumn } from '../ListValueColumn';
import { ReserveData } from 'src/store/types';

export const BorrowAssetsListItem = ({
  symbol,
  iconSymbol,
  name,
  availableBorrows,
  availableBorrowsInUSD,
  borrowCap,
  totalBorrows,
  variableBorrowRate,
  underlyingAsset,
}: ReserveData) => {
  const { openBorrow } = useModalContext();
  const borrowButtonDisable = Number(availableBorrows) <= 0;

  return (
    <ListItemWrapper
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      data-cy={`dashboardBorrowListItem_${symbol.toUpperCase()}`}
    >
      <ListValueColumn
        symbol={symbol}
        value={Number(availableBorrows)}
        subValue={Number(availableBorrowsInUSD)}
        disabled={Number(availableBorrows) === 0}
        withTooltip
        capsComponent={
          <CapsHint
            capType={CapType.borrowCap}
            capAmount={borrowCap.toString()}
            totalAmount={totalBorrows}
            withoutText
          />
        }
      />

      <ListAPRColumn
        value={Number(variableBorrowRate)}
        symbol={symbol}
      />

      <ListButtonsColumn>
        <Button
          disabled={borrowButtonDisable}
          variant="contained"
          onClick={() => openBorrow(underlyingAsset)}
        >
          <Trans>Borrow</Trans>
        </Button>
        <Button
          variant="outlined"
          component={Link}
          href={ROUTES.reserveOverview(underlyingAsset)}
        >
          <Trans>Details</Trans>
        </Button>
      </ListButtonsColumn>
    </ListItemWrapper>
  );
};
