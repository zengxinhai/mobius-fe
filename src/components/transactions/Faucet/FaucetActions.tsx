import { Trans } from '@lingui/macro';
import { ReserveData } from 'src/store/types';

import { TxActionsWrapper } from '../TxActionsWrapper';
import {useModalContext} from "../../../hooks/useModal";
import {useSubmitAndWaitTxn} from "../../../hooks/useTransactionHandler";
import {useRootStore} from "../../../store/root";
import {useCallback} from "react";
import { buildFaucetPayload } from "../../../mobius-contract";

export type FaucetActionsProps = {
  poolReserve: ReserveData;
};

export const FaucetActions = ({ poolReserve }: FaucetActionsProps) => {

  const { setMainTxState, mainTxState } =  useModalContext();
  const submitAndWaitTxn = useSubmitAndWaitTxn();
  const refreshAppData = useRootStore(state => state.refreshAppData);

  const faucetAction = useCallback(async () => {
    setMainTxState({ txHash: '', loading: true, success: false });
    const tokenType = poolReserve.underlyingAsset;
    const payload = buildFaucetPayload(tokenType, 1);
    const txn = await submitAndWaitTxn(payload)
    setMainTxState({ txHash: txn.hash, loading: false, success: true });
    refreshAppData();
  }, [setMainTxState, poolReserve.underlyingAsset, refreshAppData, submitAndWaitTxn]);

  return (
    <TxActionsWrapper
      preparingTransactions={false}
      handleAction={faucetAction}
      actionText={<Trans>Faucet {poolReserve.symbol}</Trans>}
      actionInProgressText={<Trans>Pending...</Trans>}
      mainTxState={mainTxState}
    />
  );
};
