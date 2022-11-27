import { Trans } from '@lingui/macro';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { Fragment } from 'react';

import { useAppDataContext } from 'src/hooks/useAppDataProvider'
import { APYTypeTooltip } from 'src/components/infoTooltips/APYTypeTooltip';
import { BorrowPowerTooltip } from 'src/components/infoTooltips/BorrowPowerTooltip';
import { TotalBorrowAPYTooltip } from 'src/components/infoTooltips/TotalBorrowAPYTooltip';
import { ListWrapper } from 'src/components/lists/ListWrapper';
import { DashboardContentNoData } from '../../DashboardContentNoData';
import { ListHeader } from '../ListHeader';
import { ListLoader } from '../ListLoader';
import { ListTopInfoItem } from '../ListTopInfoItem';
import { BorrowedPositionsListItem } from './BorrowedPositionsListItem';
import { BorrowedPositionsListMobileItem } from './BorrowedPositionsListMobileItem';
import { BorrowedPositionsItem } from './types';

export const BorrowedPositionsList = () => {
  const { user } = useAppDataContext();
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  const borrowPositions: BorrowedPositionsItem[] = [
    {
      name: 'Bitcoin',
      isActive: true,
      borrowingEnabled: true,
      borrowRateMode: 'Variable',
      symbol: 'BTC',
      iconSymbol: 'BTC',
      underlyingAsset: '0x1::coin::Bitcoin',
      variableBorrowAPY: '0.06',
      variableBorrows: 4394,
      variableBorrowsUSD: '5330434.34',
      totalBorrows: '3982',
      totalBorrowsUSD: '45749385'
    },
    {
      name: 'Ethereum',
      isActive: true,
      borrowingEnabled: true,
      borrowRateMode: 'Variable',
      symbol: 'ETH',
      iconSymbol: 'ETH',
      underlyingAsset: '0x1::coin::Ethereum',
      variableBorrowAPY: '0.08',
      variableBorrows: 59040,
      variableBorrowsUSD: '34330434.34',
      totalBorrows: '59820',
      totalBorrowsUSD: '0984239'
    },
  ];
  const loading = false;
  
  const collateralUsagePercent = '0.05';

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
              <ListTopInfoItem
                title={<Trans>Borrow power used</Trans>}
                value={collateralUsagePercent || 0}
                percent
                tooltip={<BorrowPowerTooltip />}
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
