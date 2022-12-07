import { Trans } from '@lingui/macro';
import { Box } from '@mui/material';
import { VariableAPYTooltip } from 'src/components/infoTooltips/VariableAPYTooltip';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { ReserveSubheader } from 'src/components/ReserveSubheader';
import { ReserveData } from 'src/store/types';

import { PanelItem } from './ReservePanels';

interface BorrowInfoProps {
  reserve: ReserveData;
}

export const BorrowInfo = ({
  reserve,
}: BorrowInfoProps) => {
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
              <Trans>Total borrowed</Trans>
            </Box>
          }
        >
          <FormattedNumber value={reserve.totalDebt} variant="main16" />
          <ReserveSubheader value={reserve.totalDebtUSD} />
        </PanelItem>
        <PanelItem
          title={
            <VariableAPYTooltip
              text={<Trans>APY, variable</Trans>}
              key="APY_res_variable_type"
              variant="description"
            />
          }
        >
          <FormattedNumber value={reserve.variableBorrowAPY} percent variant="main16" />
        </PanelItem>
        {reserve.borrowCapUSD && reserve.borrowCapUSD !== '0' && (
          <PanelItem title={<Trans>Borrow cap</Trans>}>
            <FormattedNumber value={reserve.borrowCap} variant="main16" />
            <ReserveSubheader value={reserve.borrowCapUSD} />
          </PanelItem>
        )}
      </Box>
    </Box>
  );
};
