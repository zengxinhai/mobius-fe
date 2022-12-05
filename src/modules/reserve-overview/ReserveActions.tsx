import { Trans } from '@lingui/macro';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { ReactNode } from 'react';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { Warning } from 'src/components/primitives/Warning';
import { ConnectWalletButton } from 'src/components/WalletConnection/ConnectWalletButton';
import {ReserveData, UserReserveData} from 'src/store/types';
import { useAppDataContext } from 'src/hooks/useAppDataProvider'
import { useWalletBalances } from 'src/hooks/useWalletBalances';
import { useModalContext } from 'src/hooks/useModal';
import { useWeb3Context } from 'src/libs/Web3Provider';

import { CapType } from 'src/components/caps/helper';
import { AvailableTooltip } from 'src/components/infoTooltips/AvailableTooltip';
import { Row } from 'src/components/primitives/Row';
import { WalletEmptyInfo } from '../dashboard/lists/SupplyAssetsList/WalletEmptyInfo';
import BigNumber from "bignumber.js";

const PaperWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Paper sx={{ pt: 4, pb: { xs: 4, xsm: 6 }, px: { xs: 4, xsm: 6 } }}>
      <Typography variant="h3" sx={{ mb: { xs: 6, xsm: 10 } }}>
        <Trans>Your info</Trans>
      </Typography>

      {children}
    </Paper>
  );
};

interface ReserveActionsProps {
  poolReserve: ReserveData;
  userReserve: UserReserveData;
}

export const ReserveActions = ({ poolReserve, userReserve }: ReserveActionsProps) => {
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));
  const { openBorrow, openSupply } = useModalContext();
  const { currentAccount, connecting: web3Loading } = useWeb3Context();
  const { user, loading: loadingReserves } = useAppDataContext();
  const { walletBalances, loading: loadingBalance } = useWalletBalances();
  const networkName = 'Aptos';

  if (!currentAccount)
    return (
      <Paper sx={{ pt: 4, pb: { xs: 4, xsm: 6 }, px: { xs: 4, xsm: 6 } }}>
        {web3Loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h3" sx={{ mb: { xs: 6, xsm: 10 } }}>
              <Trans>Your info</Trans>
            </Typography>
            <Typography sx={{ mb: 6 }} color="text.secondary">
              <Trans>Please connect a wallet to view your personal information here.</Trans>
            </Typography>
            <ConnectWalletButton />
          </>
        )}
      </Paper>
    );

  if (loadingReserves || loadingBalance)
    return (
      <PaperWrapper>
        <Row
          caption={<Skeleton width={100} height={20} />}
          align="flex-start"
          mb={6}
          captionVariant="description"
        >
          <Skeleton width={70} height={20} />
        </Row>

        <Row caption={<Skeleton width={100} height={20} />} mb={3}>
          <Skeleton width={70} height={20} />
        </Row>

        <Row caption={<Skeleton width={100} height={20} />} mb={10}>
          <Skeleton width={70} height={20} />
        </Row>

        <Stack direction="row" spacing={2}>
          <Skeleton width={downToXSM ? '100%' : 70} height={36} />
          <Skeleton width={downToXSM ? '100%' : 70} height={36} />
        </Stack>
      </PaperWrapper>
    );

  const balance = walletBalances[poolReserve.underlyingAsset];
  const canBorrow = new BigNumber(user.healthFactor).gt(1);
  /// TODO, implement logic
  const maxAmountToBorrow = userReserve.borrowableAmount;
  const maxAmountToSupply = balance.amount;

  return (
    <PaperWrapper>
      {balance?.amount === '0' && (
        <Row align="flex-start">
          <WalletEmptyInfo
            name={networkName}
            icon={false}
          />
        </Row>
      )}
      <Row
        caption={<Trans>Wallet balance</Trans>}
        align="flex-start"
        mb={6}
        captionVariant="description"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <FormattedNumber
            value={balance?.amount || 0}
            variant="secondary14"
            symbol={poolReserve.symbol}
          />
          <FormattedNumber
            value={balance?.amountUSD || '0'}
            variant="helperText"
            color="text.muted"
            symbolsColor="text.muted"
            symbol="USD"
          />
        </Box>
      </Row>

      <Row
        caption={
          <AvailableTooltip
            variant="description"
            text={<Trans>Available to supply</Trans>}
            capType={CapType.supplyCap}
          />
        }
        mb={3}
      >
        <FormattedNumber
          value={maxAmountToSupply}
          variant="secondary14"
          symbol={poolReserve.symbol}
        />
      </Row>

      <Row
        caption={
          <AvailableTooltip
            variant="description"
            text={<Trans>Available to borrow</Trans>}
            capType={CapType.borrowCap}
          />
        }
        mb={3}
      >
        {canBorrow ? (
          <FormattedNumber
            value={canBorrow ? maxAmountToBorrow : '0'}
            variant="secondary14"
            symbol={poolReserve.symbol}
          />
        ) : (
          <Typography variant="secondary14" color="text.secondary">
            <Trans>Unavailable</Trans>
          </Typography>
        )}
      </Row>

      {balance?.amount !== '0' && canBorrow && (
        <Warning sx={{ mb: '12px' }} severity="info" icon={false}>
          <Trans>To borrow you need to supply any asset to be used as collateral.</Trans>
        </Warning>
      )}

      <Row mb={3} />

      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Button
          variant="contained"
          disabled={balance?.amount === '0'}
          onClick={() => openSupply(poolReserve.underlyingAsset)}
          fullWidth={downToXSM}
          data-cy={'supplyButton'}
        >
          <Trans>Supply</Trans> {downToXSM && poolReserve.symbol}
        </Button>
        <Button
          disabled={!canBorrow}
          variant="contained"
          onClick={() => openBorrow(poolReserve.underlyingAsset)}
          fullWidth={downToXSM}
          data-cy={'borrowButton'}
        >
          <Trans>Borrow</Trans> {downToXSM && poolReserve.symbol}
        </Button>
      </Stack>
    </PaperWrapper>
  );
};
