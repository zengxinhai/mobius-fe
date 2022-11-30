import { Trans } from '@lingui/macro';
import { BoxProps } from '@mui/material';
import { ReserveData } from 'src/hooks/useAppDataProvider';
import { TxActionsWrapper } from '../TxActionsWrapper';

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

  const mainTxState = {};
  return (
    <TxActionsWrapper
      mainTxState={mainTxState}
      requiresAmount
      amount={amountToSupply}
      preparingTransactions={false}
      actionText={<Trans>Supply {symbol}</Trans>}
      actionInProgressText={<Trans>Supplying {symbol}</Trans>}
      handleAction={async () => {}}
      sx={sx}
      {...props}
    />
  );
};
