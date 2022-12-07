import { Trans } from '@lingui/macro';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import {Box, SvgIcon, Typography} from '@mui/material';
import { LiquidationPenaltyTooltip } from 'src/components/infoTooltips/LiquidationPenaltyTooltip';
import { LiquidationThresholdTooltip } from 'src/components/infoTooltips/LiquidationThresholdTooltip';
import { MaxLTVTooltip } from 'src/components/infoTooltips/MaxLTVTooltip';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { ReserveOverviewBox } from 'src/components/ReserveOverviewBox';
import { ReserveSubheader } from 'src/components/ReserveSubheader';
import { ReserveData } from 'src/store/types';
import { PanelItem } from './ReservePanels';

interface SupplyInfoProps {
  reserve: ReserveData;
  showSupplyCapStatus: boolean;
}

export const SupplyInfo = ({
  reserve,
  showSupplyCapStatus,
}: SupplyInfoProps) => {
  return (
    <Box sx={{ flexGrow: 1, minWidth: 0, maxWidth: '100%', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <PanelItem
          title={
            <Box display="flex" alignItems="center">
              <Trans>Total supplied</Trans>
            </Box>
          }
        >
          <FormattedNumber value={reserve.totalLiquidity} variant="main16" compact />
          <ReserveSubheader value={reserve.totalLiquidityUSD} />
        </PanelItem>
        <PanelItem title={<Trans>APY</Trans>}>
          <FormattedNumber value={reserve.supplyAPY} percent variant="main16" />
        </PanelItem>
      </Box>
      <Box
        sx={{ display: 'inline-flex', alignItems: 'center', pt: '42px', pb: '12px' }}
        paddingTop={'42px'}
      >
        <Typography variant="subheader1" color="text.main">
          <Trans>Collateral usage</Trans>
        </Typography>
        <SvgIcon fontSize="small" color="success" sx={{ ml: 2 }}>
          <CheckCircleIcon />
        </SvgIcon>
        <Typography variant="subheader1" sx={{ color: '#46BC4B' }}>
          <Trans>Can be collateral</Trans>
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <ReserveOverviewBox
          title={<MaxLTVTooltip variant="description" text={<Trans>Max LTV</Trans>} />}
        >
          <FormattedNumber
            value={reserve.totalLiquidityUSD}
            percent
            variant="secondary14"
            visibleDecimals={2}
          />
        </ReserveOverviewBox>

        <ReserveOverviewBox
          title={
            <LiquidationThresholdTooltip
              variant="description"
              text={<Trans>Liquidation threshold</Trans>}
            />
          }
        >
          <FormattedNumber
            value={reserve.liquidationThreshold}
            percent
            variant="secondary14"
            visibleDecimals={2}
          />
        </ReserveOverviewBox>

        <ReserveOverviewBox
          title={
            <LiquidationPenaltyTooltip
              variant="description"
              text={<Trans>Liquidation penalty</Trans>}
            />
          }
        >
          <FormattedNumber
            value={reserve.liquidationBonus}
            percent
            variant="secondary14"
            visibleDecimals={2}
          />
        </ReserveOverviewBox>
      </Box>
    </Box>
  );
};
