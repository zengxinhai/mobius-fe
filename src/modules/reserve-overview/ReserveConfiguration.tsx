import { Trans } from '@lingui/macro';
import { Box, Divider, Paper, SvgIcon, Typography } from '@mui/material';
import { Warning } from 'src/components/primitives/Warning';
import { ReserveData } from 'src/store/types';

import { BorrowInfo } from './BorrowInfo';
import { PanelRow, PanelTitle } from './ReservePanels';
import { SupplyInfo } from './SupplyInfo';

type ReserveConfigurationProps = {
  reserve: ReserveData;
};

export const ReserveConfiguration: React.FC<ReserveConfigurationProps> = ({ reserve }) => {
  const showSupplyCapStatus: boolean = reserve.supplyCap.toString() !== '0';

  return (
    <Paper sx={{ py: '16px', px: '24px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h3">
          <Trans>Reserve status &#38; configuration</Trans>
        </Typography>
      </Box>

      <PanelRow>
        <PanelTitle>Supply Info</PanelTitle>
        <SupplyInfo
          reserve={reserve}
          showSupplyCapStatus={showSupplyCapStatus}
        />
      </PanelRow>

      {(reserve.borrowingEnabled || Number(reserve.totalDebt) > 0) && (
        <>
          <Divider sx={{ my: '40px' }} />
          <PanelRow>
            <PanelTitle>Borrow info</PanelTitle>
            <Box sx={{ flexGrow: 1, minWidth: 0, maxWidth: '100%', width: '100%' }}>
              {!reserve.borrowingEnabled && (
                <Warning sx={{ mb: '40px' }} severity="error">
                  <Trans>
                    Borrowing is disabled due to community decision.{' '}
                  </Trans>
                </Warning>
              )}
              <BorrowInfo
                reserve={reserve}
              />
            </Box>
          </PanelRow>
        </>
      )}
    </Paper>
  );
};
