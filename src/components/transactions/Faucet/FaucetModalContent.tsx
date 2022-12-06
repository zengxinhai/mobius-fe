import { Trans } from '@lingui/macro';
import { useModalContext } from 'src/hooks/useModal';

import { GasEstimationError } from '../FlowCommons/GasEstimationError';
import { ModalWrapperProps } from '../FlowCommons/ModalWrapper';
import { TxSuccessView } from '../FlowCommons/Success';
import { DetailsNumberLine, TxModalDetails } from '../FlowCommons/TxModalDetails';
import { FaucetActions } from './FaucetActions';

export type FaucetModalContentProps = {
  underlyingAsset: string;
};

export enum ErrorType {}

export const FaucetModalContent = ({ poolReserve }: ModalWrapperProps) => {
  const { mainTxState: faucetTxState, txError } = useModalContext();
  const mintAmount = '1';

  if (faucetTxState.success)
    return (
      <TxSuccessView
        action={<Trans>Received</Trans>}
        symbol={poolReserve.symbol}
        amount={mintAmount}
      />
    );

  return (
    <>
      <TxModalDetails>
        <DetailsNumberLine
          description={<Trans>Amount</Trans>}
          iconSymbol={poolReserve.symbol}
          symbol={poolReserve.symbol}
          value={mintAmount}
        />
      </TxModalDetails>

      {txError && <GasEstimationError txError={txError} />}

      <FaucetActions poolReserve={poolReserve} />
    </>
  );
};
