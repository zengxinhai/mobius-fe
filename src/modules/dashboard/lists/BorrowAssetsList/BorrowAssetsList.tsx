import { Trans } from '@lingui/macro';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Fragment } from 'react';
import { VariableAPYTooltip } from 'src/components/infoTooltips/VariableAPYTooltip';
import { Warning } from 'src/components/primitives/Warning';

import { CapType } from 'src/components/caps/helper';
import { AvailableTooltip } from 'src/components/infoTooltips/AvailableTooltip';
import { ListWrapper } from 'src/components/lists/ListWrapper';
import { ListHeader } from '../ListHeader';
import { ListLoader } from '../ListLoader';
import { BorrowAssetsListItem } from './BorrowAssetsListItem';
import { BorrowAssetsListMobileItem } from './BorrowAssetsListMobileItem';
import { useAppDataContext } from 'src/hooks/useAppDataProvider';
import {useRootStore} from "../../../../store/root";

export const BorrowAssetsList = () => {
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));


  const { reserves: borrowReserves } = useAppDataContext();
  const loading = useRootStore(state => state.isRefreshingAppData);

  const collateralUsagePercent = 0.2;
  
  const totalCollateralMarketReferenceCurrency = '0';

  const head = [
    <AvailableTooltip
      capType={CapType.borrowCap}
      text={<Trans>Available</Trans>}
      key="Available"
      variant="subheader2"
    />,
    <VariableAPYTooltip
      text={<Trans>APY, variable</Trans>}
      key="APY_dash_variable_ type"
      variant="subheader2"
    />,
  ];

  if (loading)
    return <ListLoader title={<Trans>Assets to borrow</Trans>} head={head} withTopMargin />;

  const borrowDisabled = !borrowReserves.length;
  return (
    <ListWrapper
      titleComponent={
        <Typography component="div" variant="h3" sx={{ mr: 4 }}>
          <Trans>Assets to borrow</Trans>
        </Typography>
      }
      localStorageName="borrowAssetsDashboardTableCollapse"
      withTopMargin
      noData={borrowDisabled}
      subChildrenComponent={
        <Box sx={{ px: 6, mb: 4 }}>
          {+collateralUsagePercent >= 0.98 && (
            <Warning severity="error">
              <Trans>
                Be careful - You are very close to liquidation. Consider depositing more collateral
                or paying down some of your borrowed positions
              </Trans>
            </Warning>
          )}

          {!borrowDisabled && (
            <>
              {totalCollateralMarketReferenceCurrency === '0' && (
                <Warning severity="info">
                  <Trans>To borrow you need to supply any asset to be used as collateral.</Trans>
                </Warning>
              )}
            </>
          )}
        </Box>
      }
    >
      <>
        {!downToXSM && !!borrowReserves.length && <ListHeader head={head} />}
        {borrowReserves.map((item) => (
          <Fragment key={item.underlyingAsset}>
            {downToXSM ? (
              <BorrowAssetsListMobileItem {...item} />
            ) : (
              <BorrowAssetsListItem {...item} />
            )}
          </Fragment>
        ))}
      </>
    </ListWrapper>
  );
};
