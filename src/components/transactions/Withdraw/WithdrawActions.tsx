import { Trans } from '@lingui/macro';
import { BoxProps } from '@mui/material';
import { ReserveData } from 'src/hooks/useAppDataProvider';

import { TxActionsWrapper } from '../TxActionsWrapper';

export interface WithdrawActionsProps extends BoxProps {
  poolReserve: ReserveData;
  amountToWithdraw: string;
  poolAddress: string;
  symbol: string;
}

export const WithdrawActions = ({
  amountToWithdraw,
  symbol,
  sx,
}: WithdrawActionsProps) => {

  const mainTxState = {};
  return (
    <TxActionsWrapper
      preparingTransactions={false}
      mainTxState={mainTxState}
      amount={amountToWithdraw}
      actionInProgressText={<Trans>Withdrawing {symbol}</Trans>}
      actionText={<Trans>Withdraw {symbol}</Trans>}
      handleAction={async () => {}}
      sx={sx}
    />
  );
};
