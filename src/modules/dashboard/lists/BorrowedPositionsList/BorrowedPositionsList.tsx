import { Trans } from '@lingui/macro';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { Fragment } from 'react';

import { useAppDataContext } from 'src/hooks/useAppDataProvider'
import { APYTypeTooltip } from 'src/components/infoTooltips/APYTypeTooltip';
import { TotalBorrowAPYTooltip } from 'src/components/infoTooltips/TotalBorrowAPYTooltip';
import { ListWrapper } from 'src/components/lists/ListWrapper';
import { DashboardContentNoData } from '../../DashboardContentNoData';
import { ListHeader } from '../ListHeader';
import { ListLoader } from '../ListLoader';
import { ListTopInfoItem } from '../ListTopInfoItem';
import { BorrowedPositionsListItem } from './BorrowedPositionsListItem';
import { BorrowedPositionsListMobileItem } from './BorrowedPositionsListMobileItem';
import { BorrowedPositionsItem } from './types';
import {useRootStore} from "src/store/root";
import BigNumber from "bignumber.js";

export const BorrowedPositionsList = () => {
  const { user } = useAppDataContext();
  const loading = useRootStore(state => state.isRefreshingAppData);
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));
  
  const userResrves = useRootStore(state => state.userReserves);
  
  const borrowPositions: BorrowedPositionsItem[] = userResrves.map(r => {
    return {
      ...r.reserve,
      variableBorrows: r.variableBorrows,
      variableBorrowsUSD: BigNumber(r.variableBorrows).multipliedBy(r.reserve.priceInUSD).toString(),
      totalBorrows: r.variableBorrows,
      totalBorrowsUSD: BigNumber(r.variableBorrows).multipliedBy(r.reserve.priceInUSD).toString()
    }
  })

  const head = [
    <Trans key="Debt">Debt</Trans>,
    <Trans key="APY">APY</Trans>,
    <APYTypeTooltip text={<Trans>APY type</Trans>} key="APY type" variant="subheader2" />,
  ];

  if (loading) return <ListLoader title={<Trans>Your borrows</Trans>} head={head} />;

  return (
    <ListWrapper
      titleComponent={
        <Typography component="div" variant="h3" sx={{ mr: 4 }}>
          <Trans>Your borrows</Trans>
        </Typography>
      }
      localStorageName="borrowedAssetsDashboardTableCollapse"
      noData={!borrowPositions.length}
      topInfo={
        <>
          {!!borrowPositions.length && (
            <>
              <ListTopInfoItem title={<Trans>Balance</Trans>} value={user?.totalBorrowsUSD || 0} />
              <ListTopInfoItem
                title={<Trans>APY</Trans>}
                value={user?.debtAPY || 0}
                percent
                tooltip={<TotalBorrowAPYTooltip />}
              />
            </>
          )}
        </>
      }
    >
      {borrowPositions.length ? (
        <>
          {!downToXSM && <ListHeader head={head} />}
          {borrowPositions.map((item) => (
            <Fragment key={item.underlyingAsset + item.borrowRateMode}>
              {downToXSM ? (
                <BorrowedPositionsListMobileItem {...item} />
              ) : (
                <BorrowedPositionsListItem
                  {...item}
                  key={item.underlyingAsset + item.borrowRateMode}
                />
              )}
            </Fragment>
          ))}
        </>
      ) : (
        <DashboardContentNoData text={<Trans>Nothing borrowed yet</Trans>} />
      )}
    </ListWrapper>
  );
};
