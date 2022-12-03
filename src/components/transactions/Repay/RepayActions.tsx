import { Trans } from '@lingui/macro';
import { BoxProps } from '@mui/material';
import { ReserveData } from 'src/store/types';

import { TxActionsWrapper } from '../TxActionsWrapper';
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {useCallback} from "react";
import {useModalContext} from "../../../hooks/useModal";
import {buildRepayPayload} from "../../../mobius-contract";

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
  
  const { setMainTxState, mainTxState } =  useModalContext();
  const { signAndSubmitTransaction } = useWallet();
  
  const repayAction = useCallback(async () => {
    setMainTxState({txHash: '', loading: true, success: false});
    const tokenType = '0x1::aptos_coin::AptosCoin';
    const payload = buildRepayPayload(tokenType, Number(amountToRepay));
    await signAndSubmitTransaction(payload)
    setMainTxState({txHash: '0x01', loading: false, success: true});
  }, [setMainTxState, amountToRepay]);
  return (
    <TxActionsWrapper
      preparingTransactions={false}
      symbol={poolReserve.symbol}
      mainTxState={mainTxState}
      requiresAmount
      amount={amountToRepay}
      sx={sx}
      {...props}
      handleAction={repayAction}
      actionText={<Trans>Repay {symbol}</Trans>}
      actionInProgressText={<Trans>Repaying {symbol}</Trans>}
    />
  );
};
