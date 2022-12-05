import { Trans } from '@lingui/macro';
import { BoxProps } from '@mui/material';
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import { useCallback } from "react";
import { useModalContext } from "src/hooks/useModal";
import { ReserveData } from 'src/store/types';
import { TxActionsWrapper } from '../TxActionsWrapper';
import {buildInitAssetPayload, buildSupplyPayload} from "../../../mobius-contract";
import {useRootStore} from "../../../store/root";

export interface SupplyActionProps extends BoxProps {
  amountToSupply: string;
  poolReserve: ReserveData;
  poolAddress: string;
  symbol: string;
}

export const SupplyActions = ({
  amountToSupply,
  poolAddress,
  sx,
  symbol,
  poolReserve,
  ...props
}: SupplyActionProps) => {
  const { setMainTxState, mainTxState } =  useModalContext();
  const { signAndSubmitTransaction } = useWallet();
  const [userAssetId, refreshAppData] = useRootStore(state => [state.assetId, state.refreshAppData]);

  const supplyAction = useCallback(async () => {
    setMainTxState({ txHash: '', loading: true, success: false });
    const tokenType = poolReserve.underlyingAsset;
    const payload = userAssetId
      ? buildSupplyPayload(tokenType, Number(amountToSupply), userAssetId)
      : buildInitAssetPayload(tokenType, Number(amountToSupply))

    const txn = await signAndSubmitTransaction(payload)
    await setMainTxState({ txHash: txn.hash, loading: false, success: true });
    refreshAppData()
  }, [setMainTxState, amountToSupply, userAssetId, refreshAppData]);
  
  return (
    <TxActionsWrapper
      mainTxState={mainTxState}
      requiresAmount
      amount={amountToSupply}
      preparingTransactions={false}
      actionText={<Trans>Supply {symbol}</Trans>}
      actionInProgressText={<Trans>Supplying {symbol}</Trans>}
      handleAction={supplyAction}
      sx={sx}
      {...props}
    />
  );
};
