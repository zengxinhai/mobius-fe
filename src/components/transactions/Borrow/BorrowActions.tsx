import { Trans } from '@lingui/macro';
import { BoxProps } from '@mui/material';

import { TxActionsWrapper } from '../TxActionsWrapper';
import { useCallback } from "react";
import { useModalContext } from "src/hooks/useModal";

export interface BorrowActionsProps extends BoxProps {
  amountToBorrow: string;
  symbol: string;
}

export const BorrowActions = ({
  symbol,
  amountToBorrow,
  sx,
}: BorrowActionsProps) => {
  const { setMainTxState, mainTxState } =  useModalContext();
  
  const borrowAction = useCallback(async () => {
    setMainTxState({ txHash: '', loading: true, success: false });
    await new Promise(resolve => setTimeout(() => resolve(undefined), 2000));
    setMainTxState({ txHash: '0x01', loading: false, success: true });
  }, [setMainTxState]);

  return (
    <TxActionsWrapper
      mainTxState={mainTxState}
      requiresAmount={true}
      amount={amountToBorrow}
      handleAction={borrowAction}
      actionText={<Trans>Borrow {symbol}</Trans>}
      actionInProgressText={<Trans>Borrowing {symbol}</Trans>}
      preparingTransactions={false}
      sx={sx}
    />
  );
};
