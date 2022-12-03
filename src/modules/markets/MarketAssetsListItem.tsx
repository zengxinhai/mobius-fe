import { Trans } from '@lingui/macro';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { ReserveSubheader } from 'src/components/ReserveSubheader';

import { IncentivesCard } from 'src/components/incentives/IncentivesCard';
import { ListColumn } from 'src/components/lists/ListColumn';
import { ListItem } from 'src/components/lists/ListItem';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { Link } from 'src/components/primitives/Link';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { ReserveData } from '../../store/types'


export const MarketAssetsListItem = ({ ...reserve }: ReserveData) => {
  const router = useRouter();

  return (
    <ListItem
      px={6}
      minHeight={76}
      onClick={() => router.push('/')}
      sx={{ cursor: 'pointer' }}
      button
      data-cy={`marketListItemListItem_${reserve.symbol.toUpperCase()}`}
    >
      <ListColumn isRow maxWidth={280}>
        <TokenIcon symbol={reserve.iconSymbol} fontSize="large" />
        <Box sx={{ pl: 3.5, overflow: 'hidden' }}>
          <Typography variant="h4" noWrap>
            {reserve.name}
          </Typography>
          <Box
            sx={{
              p: { xs: '0', xsm: '3.625px 0px' },
            }}
          >
            <Typography variant="subheader2" color="text.muted" noWrap>
              {reserve.symbol}
            </Typography>
          </Box>
        </Box>
      </ListColumn>

      <ListColumn>
        <FormattedNumber compact value={reserve.totalLiquidity} variant="main16" />
        <ReserveSubheader value={reserve.totalLiquidityUSD} />
      </ListColumn>

      <ListColumn>
        <IncentivesCard
          value={reserve.supplyAPY}
          incentives={[]}
          symbol={reserve.symbol}
          variant="main16"
          symbolsVariant="secondary16"
        />
      </ListColumn>

      <ListColumn>
        <FormattedNumber compact value={reserve.totalDebt} variant="main16" />
        <ReserveSubheader value={reserve.totalDebtUSD} />
      </ListColumn>

      <ListColumn>
        <IncentivesCard
          value={
            reserve.borrowingEnabled
              ? reserve.variableBorrowAPY
              : '-1'
          }
          incentives={[]}
          symbol={reserve.symbol}
          variant="main16"
          symbolsVariant="secondary16"
        />
      </ListColumn>

      <ListColumn maxWidth={95} minWidth={95} align="right">
        <Button
          variant="outlined"
          component={Link}
          href={'/'}
        >
          <Trans>Details</Trans>
        </Button>
      </ListColumn>
    </ListItem>
  );
};
