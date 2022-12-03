import { Trans } from '@lingui/macro';
import { ReserveData } from 'src/store/types';

import { TxActionsWrapper } from '../TxActionsWrapper';

export type FaucetActionsProps = {
  poolReserve: ReserveData;
};

export const FaucetActions = ({ poolReserve }: FaucetActionsProps) => {

  const mainTxState = {};

  return (
    <TxActionsWrapper
      preparingTransactions={false}
      handleAction={async () => {}}
      actionText={<Trans>Faucet {poolReserve.symbol}</Trans>}
      actionInProgressText={<Trans>Pending...</Trans>}
      mainTxState={mainTxState}
    />
  );
};
