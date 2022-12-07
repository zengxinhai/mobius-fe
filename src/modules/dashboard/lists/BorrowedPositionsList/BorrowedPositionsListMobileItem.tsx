import { Trans } from '@lingui/macro';
import { Box, Button } from '@mui/material';

import { IncentivesCard } from 'src/components/incentives/IncentivesCard';
import { APYTypeTooltip } from 'src/components/infoTooltips/APYTypeTooltip';
import { Row } from 'src/components/primitives/Row';
import { BorrowedPositionsItem } from './types';
import { useModalContext } from 'src/hooks/useModal';
import { ListItemAPYButton } from '../ListItemAPYButton';
import { ListMobileItemWrapper } from '../ListMobileItemWrapper';
import { ListValueRow } from '../ListValueRow';

export const BorrowedPositionsListMobileItem = (props: BorrowedPositionsItem) => {
  const { openBorrow, openRepay } = useModalContext();
  const {
    totalBorrows,
    totalBorrowsUSD,
    symbol,
    iconSymbol,
    name,
    isActive,
    borrowingEnabled,
    variableBorrowAPY,
    underlyingAsset,
  } = props;

  return (
    <ListMobileItemWrapper
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      underlyingAsset={underlyingAsset}
      showBorrowCapTooltips
    >
      <ListValueRow
        title={<Trans>Debt</Trans>}
        value={totalBorrows}
        subValue={totalBorrowsUSD}
        disabled={Number(totalBorrows) === 0}
      />

      <Row caption={<Trans>APY</Trans>} align="flex-start" captionVariant="description" mb={2}>
        <IncentivesCard
          value={variableBorrowAPY}
          symbol={symbol}
          variant="secondary14"
        />
      </Row>

      <Row
        caption={
          <APYTypeTooltip text={<Trans>APY type</Trans>} key="APY type" variant="description" />
        }
        captionVariant="description"
        mb={2}
      >
        <ListItemAPYButton
          borrowRateMode={'Variable'}
          disabled={!isActive}
          onClick={() => {}}
          variableBorrowAPY={variableBorrowAPY}
          underlyingAsset={underlyingAsset}
        />
      </Row>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 5 }}>
        <Button
          disabled={!isActive}
          variant="contained"
          onClick={() => openRepay(underlyingAsset)}
          sx={{ mr: 1.5 }}
          fullWidth
        >
          <Trans>Repay</Trans>
        </Button>
        <Button
          disabled={!isActive || !borrowingEnabled}
          variant="outlined"
          onClick={() => openBorrow(underlyingAsset)}
          fullWidth
        >
          <Trans>Borrow</Trans>
        </Button>
      </Box>
    </ListMobileItemWrapper>
  );
};
