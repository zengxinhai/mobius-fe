import { Trans } from '@lingui/macro';
import { Box, Button, Typography } from '@mui/material';
import { useWeb3Context, supportWallets } from 'src/libs/Web3Provider';
import { WalletAdapter } from '@manahippo/aptos-wallet-adapter';

import { TxModalTitle } from '../transactions/FlowCommons/TxModalTitle';
import Image from "next/image";
import { getWalletIcon } from './helper';

export type WalletRowProps = {
  adapter: WalletAdapter
};

const WalletRow = ({ adapter }: WalletRowProps) => {
  const { connectWallet } = useWeb3Context();

  return (
    <Button
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        mb: '8px',
      }}
      size="large"
      onClick={() => connectWallet(adapter)}
      endIcon={<Image src={getWalletIcon(adapter)} width={24} height={24} alt={'Wallet icon'} />}
    >
      {adapter.name}
    </Button>
  );
};

export const WalletSelector = () => {
  return <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <TxModalTitle title="Connect a wallet" />
    {supportWallets.map(wallet =>
      <WalletRow
        key={wallet.name}
        adapter={wallet}
      />
    )}
    <Typography variant="helperText" sx={{ mt: '22px' }}>
      <Trans>
        Wallets are provided by External Providers and by selecting you agree to Terms of those
        Providers. Your access to the wallet might be reliant on the External Provider being
        operational.
      </Trans>
    </Typography>
  </Box>;
};
