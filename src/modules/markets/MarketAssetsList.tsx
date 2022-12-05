import { Trans } from '@lingui/macro';
import { useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { VariableAPYTooltip } from 'src/components/infoTooltips/VariableAPYTooltip';

import { ListColumn } from 'src/components/lists/ListColumn';
import { ListHeaderTitle } from 'src/components/lists/ListHeaderTitle';
import { ListHeaderWrapper } from 'src/components/lists/ListHeaderWrapper';
import { ListWrapper } from 'src/components/lists/ListWrapper';
import { MarketAssetListTitle } from './MarketAssetListTitle';
import { MarketAssetsListItem } from './MarketAssetsListItem';
import { MarketAssetsListMobileItem } from './MarketAssetsListMobileItem';
import { MarketAssetsListItemLoader } from './MarketAssetsListItemLoader';
import { MarketAssetsListMobileItemLoader } from './MarketAssetsListMobileItemLoader';
import { useRootStore } from "../../store/root";

export default function MarketAssetsList() {

  const isTableChangedToCards = useMediaQuery('(max-width:1125px)');
  const { breakpoints } = useTheme();
  const sm = useMediaQuery(breakpoints.down('sm'));

  const [sortName, setSortName] = useState('');
  const [sortDesc, setSortDesc] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [reserves, loading] = useRootStore(state => [state.reserves, state.isRefreshingAppData]);

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
  ];
  
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
      
      {loading ? (
        isTableChangedToCards ? (
          <>
            <MarketAssetsListMobileItemLoader />
            <MarketAssetsListMobileItemLoader />
            <MarketAssetsListMobileItemLoader />
          </>
        ) : (
          <>
            <MarketAssetsListItemLoader />
            <MarketAssetsListItemLoader />
            <MarketAssetsListItemLoader />
            <MarketAssetsListItemLoader />
            <MarketAssetsListItemLoader />
          </>
        )
      ) : (
        reserves.map(reserve =>
          isTableChangedToCards
            ? <MarketAssetsListMobileItem {...reserve} key={reserve.id} />
            : <MarketAssetsListItem {...reserve} key={reserve.id} />
        )
      )}
    </ListWrapper>
  );
}
