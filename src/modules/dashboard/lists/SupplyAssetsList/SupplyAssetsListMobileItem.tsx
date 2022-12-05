import { Trans } from '@lingui/macro';
import { Box, Button } from '@mui/material';

import { CapsHint } from 'src/components/caps/CapsHint';
import { CapType } from 'src/components/caps/helper';
import { IncentivesCard } from 'src/components/incentives/IncentivesCard';
import {Link, ROUTES} from 'src/components/primitives/Link';
import { Row } from 'src/components/primitives/Row';
import { useModalContext } from 'src/hooks/useModal';
import { ListMobileItemWrapper } from '../ListMobileItemWrapper';
import { ListValueRow } from '../ListValueRow';
import { SupplyAssetsItem } from './types';

export const SupplyAssetsListMobileItem = ({
  symbol,
  iconSymbol,
  name,
  walletBalance,
  walletBalanceUSD,
  supplyCap,
  totalLiquidity,
  supplyAPY,
  isActive,
  underlyingAsset,
}: SupplyAssetsItem) => {
  const { openSupply } = useModalContext();

  return (
    <ListMobileItemWrapper
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      underlyingAsset={underlyingAsset}
    >
      <ListValueRow
        title={<Trans>Supply balance</Trans>}
        value={Number(walletBalance)}
        subValue={walletBalanceUSD}
        disabled={Number(walletBalance) === 0}
        capsComponent={
          <CapsHint
            capType={CapType.supplyCap}
            capAmount={supplyCap.toString()}
            totalAmount={totalLiquidity}
            withoutText
          />
        }
      />

      <Row
        caption={<Trans>Supply APY</Trans>}
        align="flex-start"
        captionVariant="description"
        mb={2}
      >
        <IncentivesCard
          value={Number(supplyAPY)}
          incentives={[]}
          symbol={symbol}
          variant="secondary14"
        />
      </Row>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 5 }}>
        <Button
          disabled={!isActive || Number(walletBalance) <= 0}
          variant="contained"
          onClick={() => openSupply(underlyingAsset)}
          sx={{ mr: 1.5 }}
          fullWidth
        >
          <Trans>Supply</Trans>
        </Button>
        <Button
          variant="outlined"
          component={Link}
          href={ROUTES.reserveOverview(underlyingAsset)}
          fullWidth
        >
          <Trans>Details</Trans>
        </Button>
      </Box>
    </ListMobileItemWrapper>
  );
};
