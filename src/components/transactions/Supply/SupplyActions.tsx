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
  ...props
}: SupplyActionProps) => {
  const { setMainTxState, mainTxState } =  useModalContext();
  const { signAndSubmitTransaction } = useWallet();
  
  const supplyAction = useCallback(async () => {
    setMainTxState({ txHash: '', loading: true, success: false });
    const tokenType = '0x1::aptos_coin::AptosCoin';
    const payload = buildSupplyPayload(tokenType, Number(amountToSupply));
    await signAndSubmitTransaction(payload)
    setMainTxState({ txHash: '0x01', loading: false, success: true });
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
