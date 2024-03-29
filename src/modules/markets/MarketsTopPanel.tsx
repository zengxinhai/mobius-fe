import { Trans } from '@lingui/macro';
import { useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';

import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { TopInfoPanel } from 'src/components/TopInfoPanel/TopInfoPanel';
import { TopInfoPanelItem } from 'src/components/TopInfoPanel/TopInfoPanelItem';
import {useRootStore} from "../../store/root";

export const MarketsTopPanel = () => {

  const theme = useTheme();
  const downToSM = useMediaQuery(theme.breakpoints.down('sm'));

  const valueTypographyVariant = downToSM ? 'main16' : 'main21';
  const symbolsVariant = downToSM ? 'secondary16' : 'secondary21';

  const { totalAvailableUSD, totalBorrowsUSD, totalMarketSizeUSD } = useRootStore(state => state.overview)

  return (
    <TopInfoPanel pageTitle={<Trans>Markets</Trans>}>
      <TopInfoPanelItem
        withoutIconWrapper
        title={<Trans>Total market size</Trans>}
        loading={false}
      >
        <FormattedNumber
          value={totalMarketSizeUSD}
          symbol="USD"
          variant={valueTypographyVariant}
          visibleDecimals={2}
          compact
          symbolsColor="#A5A8B6"
          symbolsVariant={symbolsVariant}
        />
      </TopInfoPanelItem>
      <TopInfoPanelItem
        withoutIconWrapper
        title={<Trans>Total available</Trans>}
        loading={false}
      >
        <FormattedNumber
          value={totalAvailableUSD}
          symbol="USD"
          variant={valueTypographyVariant}
          visibleDecimals={2}
          compact
          symbolsColor="#A5A8B6"
          symbolsVariant={symbolsVariant}
        />
      </TopInfoPanelItem>
      <TopInfoPanelItem
        withoutIconWrapper
        title={<Trans>Total borrows</Trans>}
        loading={false}
      >
        <FormattedNumber
          value={totalBorrowsUSD}
          symbol="USD"
          variant={valueTypographyVariant}
          visibleDecimals={2}
          compact
          symbolsColor="#A5A8B6"
          symbolsVariant={symbolsVariant}
        />
      </TopInfoPanelItem>
    </TopInfoPanel>
  );
};
