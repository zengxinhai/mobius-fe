import { Trans } from '@lingui/macro';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';
import { ConnectWalletPaper } from 'src/components/ConnectWalletPaper';
import { ListColumn } from 'src/components/lists/ListColumn';
import { ListHeaderTitle } from 'src/components/lists/ListHeaderTitle';
import { ListHeaderWrapper } from 'src/components/lists/ListHeaderWrapper';
import { ListItem } from 'src/components/lists/ListItem';
import { ListWrapper } from 'src/components/lists/ListWrapper';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { Link, ROUTES } from 'src/components/primitives/Link';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { useAppDataContext } from 'src/hooks/useAppDataProvider';
import { useWalletBalances } from 'src/hooks/useWalletBalances';
import { useModalContext } from 'src/hooks/useModal';
import { useWeb3Context } from 'src/libs/Web3Provider';

import { FaucetItemLoader } from './FaucetItemLoader';
import { FaucetMobileItemLoader } from './FaucetMobileItemLoader';
import {useRootStore} from "../../store/root";
import BigNumber from "bignumber.js";

export default function FaucetAssetsList() {
  const { reserves, loading } = useAppDataContext();
  const { walletBalances } = useWalletBalances();
  const { openFaucet } = useModalContext();
  const { currentAccount } = useWeb3Context();

  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  const nativeCoin = useRootStore(state => state.nativeCoin);

  const listData = reserves
    .filter(reserve => reserve.underlyingAsset !== nativeCoin) // we don't need faucet for native coin
    .map((reserve) => {
      const walletBalance = BigNumber(
        walletBalances[reserve.underlyingAsset]?.amount || '0'
      );
      return {
        ...reserve,
        walletBalance,
      };
    });

  if (!currentAccount) {
    return (
      <ConnectWalletPaper
        loading={false}
        description={<Trans>Please connect your wallet to get free testnet assets.</Trans>}
      />
    );
  }

  return (
    <ListWrapper
      titleComponent={
        <Typography component="div" variant="h2" sx={{ mr: 4 }}>
          <Trans>Test Assets</Trans>
        </Typography>
      }
    >
      <ListHeaderWrapper px={downToXSM ? 4 : 6}>
        <ListColumn isRow maxWidth={280}>
          <ListHeaderTitle>
            <Trans>Asset</Trans>
          </ListHeaderTitle>
        </ListColumn>

        {!downToXSM && (
          <ListColumn>
            <ListHeaderTitle>
              <Trans>Wallet balance</Trans>
            </ListHeaderTitle>
          </ListColumn>
        )}

        <ListColumn maxWidth={280} />
      </ListHeaderWrapper>

      {loading ? (
        downToXSM ? (
          <>
            <FaucetMobileItemLoader />
            <FaucetMobileItemLoader />
            <FaucetMobileItemLoader />
          </>
        ) : (
          <>
            <FaucetItemLoader />
            <FaucetItemLoader />
            <FaucetItemLoader />
          </>
        )
      ) : (
        listData.map((reserve) => (
          <ListItem px={downToXSM ? 4 : 6} key={reserve.symbol}>
            <ListColumn isRow maxWidth={280}>
              <Link
                href={ROUTES.reserveOverview(reserve.underlyingAsset)}
                noWrap
                sx={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <TokenIcon symbol={reserve.iconSymbol} fontSize="large" />
                <Box sx={{ pl: 3.5, overflow: 'hidden' }}>
                  <Typography variant="h4" noWrap>
                    {reserve.name}
                  </Typography>
                  <Typography variant="subheader2" color="text.muted" noWrap>
                    {reserve.symbol}
                  </Typography>
                </Box>
              </Link>
            </ListColumn>

            {!downToXSM && (
              <ListColumn>
                <FormattedNumber
                  compact
                  value={reserve.walletBalance.toString()}
                  variant="main16"
                />
              </ListColumn>
            )}

            <ListColumn maxWidth={280} align="right">
              <Button variant="contained" onClick={() => openFaucet(reserve.underlyingAsset)}>
                <Trans>Faucet</Trans>
              </Button>
            </ListColumn>
          </ListItem>
        ))
      )}
    </ListWrapper>
  );
}
