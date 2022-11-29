import { Trans } from '@lingui/macro';
import { Button } from '@mui/material';
import { useWeb3Context } from 'src/libs/Web3Provider';

import { WalletModal } from './WalletModal';

export const ConnectWalletButton = () => {
  const { setWalletModalOpen } = useWeb3Context();

  return (
    <>
      <Button variant="gradient" onClick={() => setWalletModalOpen(true)}>
        <Trans>Connect wallet</Trans>
      </Button>
      <WalletModal />
    </>
  );
};
