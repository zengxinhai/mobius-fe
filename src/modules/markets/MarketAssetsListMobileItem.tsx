import { Trans } from '@lingui/macro';
import { Box, Button, Divider } from '@mui/material';
import { StableAPYTooltip } from 'src/components/infoTooltips/StableAPYTooltip';
import { VariableAPYTooltip } from 'src/components/infoTooltips/VariableAPYTooltip';
import { ReserveSubheader } from 'src/components/ReserveSubheader';

import { IncentivesCard } from '../../components/incentives/IncentivesCard';
import { FormattedNumber } from '../../components/primitives/FormattedNumber';
import { Link } from '../../components/primitives/Link';
import { Row } from '../../components/primitives/Row';
import { ListMobileItemWrapper } from './ListMobileItemWrapper';

import { Reserve } from './MarketAssetsListItem'

export const MarketAssetsListMobileItem = ({ ...reserve }: Reserve) => {
  return (
    <ListMobileItemWrapper
      symbol={reserve.symbol}
      iconSymbol={reserve.iconSymbol}
      name={reserve.name}
      underlyingAsset={''}
    >
      <Row caption={<Trans>Total supplied</Trans>} captionVariant="description" mb={3}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'flex-end' },
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <FormattedNumber compact value={reserve.totalLiquidity} variant="secondary14" />
          <ReserveSubheader value={reserve.totalLiquidityUSD} rightAlign={true} />
        </Box>
      </Row>
      <Row
        caption={<Trans>Supply APY</Trans>}
        captionVariant="description"
        mb={3}
        align="flex-start"
      >
        <IncentivesCard
          align="flex-end"
          value={reserve.supplyAPY}
          incentives={[]}
          symbol={reserve.symbol}
          variant="secondary14"
        />
      </Row>

      <Divider sx={{ mb: 3 }} />

      <Row caption={<Trans>Total borrowed</Trans>} captionVariant="description" mb={3}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'flex-end' },
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <FormattedNumber compact value={reserve.totalDebt} variant="secondary14" />
          <ReserveSubheader value={reserve.totalDebtUSD} rightAlign={true} />
        </Box>
      </Row>
      <Row
        caption={
          <VariableAPYTooltip
            text={<Trans>Borrow APY, variable</Trans>}
            key="APY_list_mob_variable_type"
            variant="description"
          />
        }
        captionVariant="description"
        mb={3}
        align="flex-start"
      >
        <IncentivesCard
          align="flex-end"
          value={reserve.borrowingEnabled ? reserve.variableBorrowAPY : '-1'}
          incentives={[]}
          symbol={reserve.symbol}
          variant="secondary14"
        />
      </Row>
      <Row
        caption={
          <StableAPYTooltip
            text={<Trans>Borrow APY, stable</Trans>}
            key="APY_list_mob_stable_type"
            variant="description"
          />
        }
        captionVariant="description"
        mb={4}
        align="flex-start"
      >
        <IncentivesCard
          align="flex-end"
          value={reserve.stableBorrowRateEnabled ? reserve.stableBorrowAPY : -1}
          incentives={[]}
          symbol={reserve.symbol}
          variant="secondary14"
        />
      </Row>

      <Button
        variant="outlined"
        component={Link}
        href={'/'}
        fullWidth
      >
        <Trans>View details</Trans>
      </Button>
    </ListMobileItemWrapper>
  );
};