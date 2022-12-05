import { Trans } from '@lingui/macro';
import { BoxProps } from '@mui/material';

import { TxActionsWrapper } from '../TxActionsWrapper';
import { useCallback } from "react";
import { useModalContext } from "src/hooks/useModal";
import {buildBorrowPayload} from 'src/mobius-contract'
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {ReserveData} from "../../../store/types";
import {useRootStore} from "../../../store/root";

export interface BorrowActionsProps extends BoxProps {
  amountToBorrow: string;
  symbol: string;
  poolReserve: ReserveData;
}

export const BorrowActions = ({
  symbol,
  amountToBorrow,
  poolReserve,
  sx,
}: BorrowActionsProps) => {
  const { setMainTxState, mainTxState } =  useModalContext();
  const { signAndSubmitTransaction } = useWallet();
  const [userAssetId, refreshAppData] = useRootStore(state => [state.assetId, state.refreshAppData]);

  const borrowAction = useCallback(async () => {
    if (userAssetId === undefined) return;
    setMainTxState({ txHash: '', loading: true, success: false });
    const tokenType = poolReserve.underlyingAsset;
    const payload = buildBorrowPayload(tokenType, Number(amountToBorrow), userAssetId);
    const txn = await signAndSubmitTransaction(payload)
    setMainTxState({ txHash: txn.hash, loading: false, success: true });
    refreshAppData();
  }, [setMainTxState, amountToBorrow, userAssetId, refreshAppData]);

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
