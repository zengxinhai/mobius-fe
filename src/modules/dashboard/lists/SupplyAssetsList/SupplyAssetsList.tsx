import { Trans } from '@lingui/macro';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Fragment, useState } from 'react';
import { Warning } from 'src/components/primitives/Warning';

import { ListWrapper } from 'src/components/lists/ListWrapper';
import { Link, ROUTES } from 'src/components/primitives/Link';
import { DashboardListTopPanel } from '../../DashboardListTopPanel';
import { ListHeader } from '../ListHeader';
import { ListLoader } from '../ListLoader';
import { SupplyAssetsListItem } from './SupplyAssetsListItem';
import { SupplyAssetsListMobileItem } from './SupplyAssetsListMobileItem';
import { WalletEmptyInfo } from './WalletEmptyInfo';
import { SupplyAssetsItem } from './types';
import { useAppDataContext } from 'src/hooks/useAppDataProvider';

export const SupplyAssetsList = () => {
  const networkName = 'Aptos';
  const isTestnet = true;
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));
  const loading = false;

  const localStorageName = 'showSupplyZeroAssets';
  const [isShowZeroAssets, setIsShowZeroAssets] = useState(
    localStorage.getItem(localStorageName) === 'true'
  );

  const { reserves } = useAppDataContext();
  
  const tokensToSupply: SupplyAssetsItem[] = reserves.map(r => {
    return {
      ...r,
      walletBalance: '200.12',
      walletBalanceUSD: '1050.48',
      availableToDeposit: '100',
      availableToDepositUSD: '480.12',
    }
  })

  const sortedSupplyReserves = tokensToSupply.sort((a, b) =>
    +a.walletBalanceUSD > +b.walletBalanceUSD ? -1 : 1
  );
  const filteredSupplyReserves = sortedSupplyReserves.filter(
    (reserve) => reserve.availableToDepositUSD !== '0'
  );

  const supplyReserves = isShowZeroAssets
    ? sortedSupplyReserves
    : filteredSupplyReserves.length >= 1
    ? filteredSupplyReserves
    : sortedSupplyReserves;

  const head = [
    <Trans key="Wallet balance">Wallet balance</Trans>,
    <Trans key="APY">APY</Trans>,
  ];

  if (loading)
    return <ListLoader title={<Trans>Assets to supply</Trans>} head={head} withTopMargin />;

  const supplyDisabled = !tokensToSupply.length;
  return (
    <ListWrapper
      titleComponent={
        <Typography component="div" variant="h3" sx={{ mr: 4 }}>
          <Trans>Assets to supply</Trans>
        </Typography>
      }
      localStorageName="supplyAssetsDashboardTableCollapse"
      withTopMargin
      noData={supplyDisabled}
      subChildrenComponent={
        <>
          <Box sx={{ px: 6 }}>
            {
              filteredSupplyReserves.length === 0 &&
              (isTestnet ? (
                <Warning severity="info">
                  <Trans>Your {networkName} wallet is empty. Get free test assets at </Trans>{' '}
                  <Link href={ROUTES.faucet} style={{fontWeight: 400}}>
                    <Trans>{networkName} Faucet</Trans>
                  </Link>
                </Warning>
              ) : (
                <WalletEmptyInfo name={networkName}/>
              ))
            }
          </Box>

          {filteredSupplyReserves.length >= 1 && (
            <DashboardListTopPanel
              value={isShowZeroAssets}
              onClick={setIsShowZeroAssets}
              localStorageName={localStorageName}
            />
          )}
        </>
      }
    >
      <>
        {!downToXSM && !!supplyReserves && !supplyDisabled && <ListHeader head={head} />}
        {supplyReserves.map((item) => (
          <Fragment key={item.underlyingAsset}>
            {downToXSM ? (
              <SupplyAssetsListMobileItem {...item} key={item.symbol} />
            ) : (
              <SupplyAssetsListItem {...item} key={item.symbol} />
            )}
          </Fragment>
        ))}
      </>
    </ListWrapper>
  );
};
