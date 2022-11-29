import { Trans } from '@lingui/macro';
import { BoxProps } from '@mui/material';
import { ReserveData } from 'src/hooks/useAppDataProvider';

import { TxActionsWrapper } from '../TxActionsWrapper';

export interface RepayActionProps extends BoxProps {
  amountToRepay: string;
  poolReserve: ReserveData;
  symbol: string;
}

export const RepayActions = ({
  amountToRepay,
  poolReserve,
  sx,
  symbol,
  ...props
}: RepayActionProps) => {

  const mainTxState = {}
  return (
    <TxActionsWrapper
      preparingTransactions={false}
      symbol={poolReserve.symbol}
      mainTxState={mainTxState}
      requiresAmount
      amount={amountToRepay}
      sx={sx}
      {...props}
      handleAction={async () => {}}
      actionText={<Trans>Repay {symbol}</Trans>}
      actionInProgressText={<Trans>Repaying {symbol}</Trans>}
    />
  );
};
