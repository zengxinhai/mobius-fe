import { Trans } from '@lingui/macro';
import { Box, Button } from '@mui/material';

import { IncentivesCard } from 'src/components/incentives/IncentivesCard';
import { Row } from 'src/components/primitives/Row';
import { useModalContext } from 'src/hooks/useModal';
import { ListMobileItemWrapper } from '../ListMobileItemWrapper';
import { ListValueRow } from '../ListValueRow';
import { SupplyPositionItem } from './types';

export const SuppliedPositionsListMobileItem = ({
  underlyingBalance,
  underlyingBalanceUSD,
  underlyingAsset,
  ...reserve
}: SupplyPositionItem) => {
  const { symbol, iconSymbol, name, supplyAPY, isActive } =
    reserve;
  const { openSupply, openWithdraw } = useModalContext();

  return (
    <ListMobileItemWrapper
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      underlyingAsset={underlyingAsset}
      showSupplyCapTooltips
      showDebtCeilingTooltips
    >
      <ListValueRow
        title={<Trans>Supply balance</Trans>}
        value={underlyingBalance}
        subValue={underlyingBalanceUSD}
        disabled={Number(underlyingBalance) === 0}
      />

      <Row
        caption={<Trans>Supply APY</Trans>}
        align="flex-start"
        captionVariant="description"
        mb={2}
      >
        <IncentivesCard
          value={supplyAPY}
          incentives={[]}
          symbol={symbol}
          variant="secondary14"
        />
      </Row>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 5 }}>
        <Button
          disabled={!isActive}
          variant="contained"
          onClick={() => openWithdraw(underlyingAsset)}
          sx={{ mr: 1.5 }}
          fullWidth
        >
          <Trans>Withdraw</Trans>
        </Button>

        <Button
          disabled={!isActive}
          variant="outlined"
          onClick={() => openSupply(underlyingAsset)}
          fullWidth
        >
          <Trans>Supply</Trans>
        </Button>
      </Box>
    </ListMobileItemWrapper>
  );
};
