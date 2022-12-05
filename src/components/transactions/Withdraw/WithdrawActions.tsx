import { Trans } from '@lingui/macro';
import { BoxProps } from '@mui/material';
import { ReserveData } from 'src/store/types';

import { TxActionsWrapper } from '../TxActionsWrapper';
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {useCallback} from "react";
import {useModalContext} from "../../../hooks/useModal";
import {buildWithdrawPayload} from "../../../mobius-contract";

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
  poolReserve
}: WithdrawActionsProps) => {

  const { setMainTxState, mainTxState } =  useModalContext();
  const { signAndSubmitTransaction } = useWallet();
  
  const withdrawAction = useCallback(async () => {
    setMainTxState({ txHash: '', loading: true, success: false });
    const payload = buildWithdrawPayload(poolReserve.underlyingAsset, Number(amountToWithdraw));
    const txn = await signAndSubmitTransaction(payload)
    setMainTxState({ txHash: txn.hash, loading: false, success: true });
  }, [setMainTxState, amountToWithdraw]);
  return (
    <TxActionsWrapper
      preparingTransactions={false}
      mainTxState={mainTxState}
      amount={amountToWithdraw}
      actionInProgressText={<Trans>Withdrawing {symbol}</Trans>}
      actionText={<Trans>Withdraw {symbol}</Trans>}
      handleAction={withdrawAction}
      sx={sx}
    />
  );
};
