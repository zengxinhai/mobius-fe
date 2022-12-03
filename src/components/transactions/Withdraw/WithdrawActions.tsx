import { Trans } from '@lingui/macro';
import { BoxProps } from '@mui/material';
import { ReserveData } from 'src/store/types';

import { TxActionsWrapper } from '../TxActionsWrapper';
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {useCallback} from "react";
import {useModalContext} from "../../../hooks/useModal";
import {buildSupplyPayload, buildWithdrawPayload} from "../../../mobius-contract";

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

  const { setMainTxState, mainTxState } =  useModalContext();
  const { signAndSubmitTransaction } = useWallet();
  
  const withdrawAction = useCallback(async () => {
    setMainTxState({ txHash: '', loading: true, success: false });
    const tokenType = '0x1::aptos_coin::AptosCoin';
    const payload = buildWithdrawPayload(tokenType, Number(amountToWithdraw));
    await signAndSubmitTransaction(payload)
    setMainTxState({ txHash: '0x01', loading: false, success: true });
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
