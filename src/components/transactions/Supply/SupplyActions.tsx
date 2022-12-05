import { Trans } from '@lingui/macro';
import { BoxProps } from '@mui/material';
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import { useCallback } from "react";
import { useModalContext } from "src/hooks/useModal";
import { ReserveData } from 'src/store/types';
import { TxActionsWrapper } from '../TxActionsWrapper';
import {buildSupplyPayload} from "../../../mobius-contract";

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
  
  const supplyAction = useCallback(async () => {
    setMainTxState({ txHash: '', loading: true, success: false });
    const tokenType = poolReserve.underlyingAsset;
    const payload = buildSupplyPayload(tokenType, Number(amountToSupply));
    const txn = await signAndSubmitTransaction(payload)
    await setMainTxState({ txHash: txn.hash, loading: false, success: true });
  }, [setMainTxState, amountToSupply]);
  
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
