import { Trans } from '@lingui/macro';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { StableAPYTooltip } from 'src/components/infoTooltips/StableAPYTooltip';
import { VariableAPYTooltip } from 'src/components/infoTooltips/VariableAPYTooltip';

import { ListColumn } from 'src/components/lists/ListColumn';
import { ListHeaderTitle } from 'src/components/lists/ListHeaderTitle';
import { ListHeaderWrapper } from 'src/components/lists/ListHeaderWrapper';
import { ListWrapper } from 'src/components/lists/ListWrapper';
import { MarketAssetListTitle } from './MarketAssetListTitle';
import { MarketAssetsListItem, Reserve } from './MarketAssetsListItem';

export default function MarketAssetsList() {

  const isTableChangedToCards = useMediaQuery('(max-width:1125px)');
  const { breakpoints } = useTheme();
  const sm = useMediaQuery(breakpoints.down('sm'));

  const [sortName, setSortName] = useState('');
  const [sortDesc, setSortDesc] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const header = [
    {
      title: <Trans>Asset</Trans>,
      sortKey: 'symbol',
    },
    {
      title: <Trans>Total supplied</Trans>,
      sortKey: 'totalLiquidityUSD',
    },
    {
      title: <Trans>Supply APY</Trans>,
      sortKey: 'supplyAPY',
    },
    {
      title: <Trans>Total borrowed</Trans>,
      sortKey: 'totalDebtUSD',
    },
    {
      title: (
        <VariableAPYTooltip
          text={<Trans>Borrow APY, variable</Trans>}
          key="APY_list_variable_type"
          variant="subheader2"
        />
      ),
      sortKey: 'variableBorrowAPY',
    },
    {
      title: (
        <StableAPYTooltip
          text={<Trans>Borrow APY, stable</Trans>}
          key="APY_list_stable_type"
          variant="subheader2"
        />
      ),
      sortKey: 'stableBorrowAPY',
    },
  ];
  
  const reserves: Reserve[] = [
    {
      name: 'Aptos Coin',
      symbol: 'APT',
      iconSymbol: 'apt',
      totalLiquidity: 89000000,
      totalLiquidityUSD: '765453443.54',
      supplyAPY: 0.08,
      totalDebt: 147597435,
      totalDebtUSD: '9574844.23',
      borrowingEnabled: true,
      variableBorrowAPY: 0.1,
      stableBorrowRateEnabled: true,
      stableBorrowAPY: 0.08,
      totalStableDebtUSD: '8335984.1',
    },
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      iconSymbol: 'btc',
      totalLiquidity: 8790,
      totalLiquidityUSD: '34455435.54',
      supplyAPY: 0.031,
      totalDebt: 34748597435,
      totalDebtUSD: '75764844.23',
      borrowingEnabled: true,
      variableBorrowAPY: 0.052,
      stableBorrowRateEnabled: true,
      stableBorrowAPY: 0.034,
      totalStableDebtUSD: '98335984.1',
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      iconSymbol: 'eth',
      totalLiquidity: 1103440,
      totalLiquidityUSD: '1438879909',
      supplyAPY: 0.04,
      totalDebt: 584978,
      totalDebtUSD: '576484400.23',
      borrowingEnabled: true,
      variableBorrowAPY: 0.06,
      stableBorrowRateEnabled: true,
      stableBorrowAPY: 0.041,
      totalStableDebtUSD: '98335984.1',
    }
  ]

  return (
    <ListWrapper
      titleComponent={
        <MarketAssetListTitle
          onSearchTermChange={setSearchTerm}
          marketTitle='Mobius / Aptos market'
        />
      }
    >
      {!isTableChangedToCards && (
        <ListHeaderWrapper px={6}>
          {header.map((col) => (
            <ListColumn
              isRow={col.sortKey === 'symbol'}
              maxWidth={col.sortKey === 'symbol' ? 280 : undefined}
              key={col.sortKey}
            >
              <ListHeaderTitle
                sortName={sortName}
                sortDesc={sortDesc}
                setSortName={setSortName}
                setSortDesc={setSortDesc}
                sortKey={col.sortKey}
              >
                {col.title}
              </ListHeaderTitle>
            </ListColumn>
          ))}
          <ListColumn maxWidth={95} minWidth={95} />
        </ListHeaderWrapper>
      )}
  
      {reserves.map(reserve => (
        <MarketAssetsListItem {...reserve} key={reserve.symbol} />
      ))}
    </ListWrapper>
  );
}
