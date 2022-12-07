import { Trans } from '@lingui/macro';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { Fragment } from 'react';

import { TotalSupplyAPYTooltip } from 'src/components/infoTooltips/TotalSupplyAPYTooltip';
import { ListWrapper } from 'src/components/lists/ListWrapper';
import { useAppDataContext } from 'src/hooks/useAppDataProvider';
import { ListTopInfoItem } from '../ListTopInfoItem';
import { DashboardContentNoData } from '../../DashboardContentNoData';
import { ListHeader } from '../ListHeader';
import { ListLoader } from '../ListLoader';
import { SuppliedPositionsListItem } from './SuppliedPositionsListItem';
import { SuppliedPositionsListMobileItem } from './SuppliedPositionsListMobileItem';
import { SupplyPositionItem } from './types';
import {useRootStore} from "../../../../store/root";

export const SuppliedPositionsList = () => {
  const { user } = useAppDataContext();
  const loading = useRootStore(state => state.isRefreshingAppData);
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));
  
  const r = useRootStore(state => state.userReserves);
  
  const suppliedPosition: SupplyPositionItem[] = r.map(item => {
    return {
      ...item.reserve,
      underlyingBalance: item.underlyingBalance,
      underlyingBalanceUSD: Number(item.underlyingBalance) * Number(item.reserve.priceInUSD),
    }
  })
  
  const head = [
    <Trans key="Balance">Balance</Trans>,
    <Trans key="APY">APY</Trans>,
  ];

  if (loading) return <ListLoader title={<Trans>Your supplies</Trans>} head={head} />;

  return (
    <ListWrapper
      titleComponent={
        <Typography component="div" variant="h3" sx={{ mr: 4 }}>
          <Trans>Your supplies</Trans>
        </Typography>
      }
      localStorageName="suppliedAssetsDashboardTableCollapse"
      noData={!suppliedPosition.length}
      topInfo={
        <>
          {!!suppliedPosition.length && (
            <>
              <ListTopInfoItem
                title={<Trans>Balance</Trans>}
                value={user?.totalCollateralUSD || '0'}
              />
              <ListTopInfoItem
                title={<Trans>APY</Trans>}
                value={user?.earnedAPY || '0'}
                percent
                tooltip={<TotalSupplyAPYTooltip />}
              />
            </>
          )}
        </>
      }
    >
      {suppliedPosition.length ? (
        <>
          {!downToXSM && <ListHeader head={head} />}
          {suppliedPosition.map((item) => (
            <Fragment key={item.underlyingAsset}>
              {downToXSM ? (
                <SuppliedPositionsListMobileItem {...item} />
              ) : (
                <SuppliedPositionsListItem {...item} />
              )}
            </Fragment>
          ))}
        </>
      ) : (
        <DashboardContentNoData text={<Trans>Nothing supplied yet</Trans>} />
      )}
    </ListWrapper>
  );
};
