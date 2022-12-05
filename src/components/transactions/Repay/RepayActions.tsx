import { Trans } from '@lingui/macro';
import { BoxProps } from '@mui/material';
import { ReserveData } from 'src/store/types';

import { TxActionsWrapper } from '../TxActionsWrapper';
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {useCallback} from "react";
import {useModalContext} from "../../../hooks/useModal";
import {buildRepayPayload} from "../../../mobius-contract";
import {useRootStore} from "../../../store/root";
import {useSubmitAndWaitTxn} from "../../../hooks/useTransactionHandler";

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
  const submitAndWaitTxn = useSubmitAndWaitTxn();
  const [userAssetId, refreshAppData] = useRootStore(state => [state.assetId, state.refreshAppData]);

  const repayAction = useCallback(async () => {
    if (userAssetId === undefined) return;
    setMainTxState({txHash: '', loading: true, success: false});
    const tokenType = poolReserve.underlyingAsset;
    const payload = buildRepayPayload(tokenType, Number(amountToRepay), userAssetId);
    const txn = await submitAndWaitTxn(payload)
    setMainTxState({txHash: txn.hash, loading: false, success: true});
    refreshAppData();
  }, [setMainTxState, amountToRepay, poolReserve.underlyingAsset, userAssetId, refreshAppData, submitAndWaitTxn]);
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
