import { Trans } from '@lingui/macro';
import { BoxProps } from '@mui/material';

import { TxActionsWrapper } from '../TxActionsWrapper';
import { useCallback } from "react";
import { useModalContext } from "src/hooks/useModal";
import {buildBorrowPayload} from 'src/mobius-contract'
import {useWallet} from "@manahippo/aptos-wallet-adapter";

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
  const { signAndSubmitTransaction } = useWallet();
  
  const borrowAction = useCallback(async () => {
    setMainTxState({ txHash: '', loading: true, success: false });
    const tokenType = '0x1::aptos_coin::AptosCoin';
    const payload = buildBorrowPayload(tokenType, Number(amountToBorrow));
    await signAndSubmitTransaction(payload)
    setMainTxState({ txHash: '0x01', loading: false, success: true });
  }, [setMainTxState, amountToBorrow]);

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
