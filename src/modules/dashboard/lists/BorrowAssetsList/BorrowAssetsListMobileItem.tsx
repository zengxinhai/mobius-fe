import { Trans } from '@lingui/macro';
import { Box, Button } from '@mui/material';
import { VariableAPYTooltip } from 'src/components/infoTooltips/VariableAPYTooltip';

import { CapsHint } from 'src/components/caps/CapsHint';
import { CapType } from 'src/components/caps/helper';
import { IncentivesCard } from 'src/components/incentives/IncentivesCard';
import {Link, ROUTES} from 'src/components/primitives/Link';
import { Row } from 'src/components/primitives/Row';
import { useModalContext } from 'src/hooks/useModal';
import { ListMobileItemWrapper } from '../ListMobileItemWrapper';
import { ListValueRow } from '../ListValueRow';
import { ReserveData } from 'src/store/types';

export const BorrowAssetsListMobileItem = ({
  symbol,
  iconSymbol,
  name,
  availableBorrows,
  availableBorrowsInUSD,
  borrowCap,
  totalBorrows,
  variableBorrowRate,
  underlyingAsset,
}: ReserveData) => {
  const { openBorrow } = useModalContext();
  const borrowButtonDisable = Number(availableBorrows) <= 0;

  return (
    <ListMobileItemWrapper
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      underlyingAsset={underlyingAsset}
    >
      <ListValueRow
        title={<Trans>Available to borrow</Trans>}
        value={Number(availableBorrows)}
        subValue={Number(availableBorrowsInUSD)}
        disabled={Number(availableBorrows) === 0}
        capsComponent={
          <CapsHint
            capType={CapType.borrowCap}
            capAmount={borrowCap.toString()}
            totalAmount={totalBorrows}
            withoutText
          />
        }
      />

      <Row
        caption={
          <VariableAPYTooltip
            text={<Trans>APY, variable</Trans>}
            key="APY_dash_mob_variable_ type"
            variant="description"
          />
        }
        align="flex-start"
        captionVariant="description"
        mb={2}
      >
        <IncentivesCard
          value={Number(variableBorrowRate)}
          incentives={[]}
          symbol={symbol}
          variant="secondary14"
        />
      </Row>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 5 }}>
        <Button
          disabled={borrowButtonDisable}
          variant="contained"
          onClick={() => openBorrow(underlyingAsset)}
          sx={{ mr: 1.5 }}
          fullWidth
        >
          <Trans>Borrow</Trans>
        </Button>
        <Button
          variant="outlined"
          component={Link}
          href={ROUTES.reserveOverview(underlyingAsset)}
          fullWidth
        >
          <Trans>Details</Trans>
        </Button>
      </Box>
    </ListMobileItemWrapper>
  );
};
