import { Trans } from '@lingui/macro';
import { BoxProps } from '@mui/material';

import { TxActionsWrapper } from '../TxActionsWrapper';

export interface BorrowActionsProps extends BoxProps {
  amountToBorrow: string;
  symbol: string;
}

export const BorrowActions = ({
  symbol,
  amountToBorrow,
  sx,
}: BorrowActionsProps) => {
  const mainTxState = {
    txHash: '',
    loading: false,
    success: false
  }

  return (
    <TxActionsWrapper
      mainTxState={mainTxState}
      requiresAmount={true}
      amount={amountToBorrow}
      handleAction={async () => {}}
      actionText={<Trans>Borrow {symbol}</Trans>}
      actionInProgressText={<Trans>Borrowing {symbol}</Trans>}
      preparingTransactions={false}
      sx={sx}
    />
  );
};
