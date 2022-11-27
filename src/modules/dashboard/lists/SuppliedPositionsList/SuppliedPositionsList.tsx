import { Trans } from '@lingui/macro';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { Fragment } from 'react';

import { CollateralSwitchTooltip } from 'src/components/infoTooltips/CollateralSwitchTooltip';
import { CollateralTooltip } from 'src/components/infoTooltips/CollateralTooltip';
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

export const SuppliedPositionsList = () => {
  const { user, loading } = useAppDataContext();
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  const suppliedPosition: SupplyPositionItem[] = [
    {
      symbol: 'APT',
      iconSymbol: 'APT',
      name: 'Aptos Coin',
      supplyAPY: '0.12',
      isActive: true,
      underlyingBalance: '120000',
      underlyingBalanceUSD: '4800000',
      underlyingAsset: '0x1::coin::AptosCoin'
    },
    {
      symbol: 'BTC',
      iconSymbol: 'BTC',
      name: 'Bitcoin',
      supplyAPY: '0.04',
      isActive: true,
      underlyingBalance: '1.1',
      underlyingBalanceUSD: '21000',
      underlyingAsset: '0x1::coin::Bitcoin'
    }
  ];

  const head = [
    <Trans key="Balance">Balance</Trans>,
    <Trans key="APY">APY</Trans>,
    <CollateralSwitchTooltip
      text={<Trans>Collateral</Trans>}
      key="Collateral"
      variant="subheader2"
    />,
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
                value={user?.totalLiquidityUSD || 0}
              />
              <ListTopInfoItem
                title={<Trans>APY</Trans>}
                value={user?.earnedAPY || 0}
                percent
                tooltip={<TotalSupplyAPYTooltip />}
              />
              <ListTopInfoItem
                title={<Trans>Collateral</Trans>}
                value={user?.totalCollateralUSD || 0}
                tooltip={<CollateralTooltip />}
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
