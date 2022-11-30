import {
  valueToBigNumber,
} from '@aave/math-utils';
import { Trans } from '@lingui/macro';
import BigNumber from 'bignumber.js';
import React, { useRef, useState } from 'react';
import { useModalContext } from 'src/hooks/useModal';

import { useAppDataContext } from 'src/hooks/useAppDataProvider';
import { CapType } from '../../caps/helper';
import { AssetInput } from '../AssetInput';
import { GasEstimationError } from '../FlowCommons/GasEstimationError';
import { ModalWrapperProps } from '../FlowCommons/ModalWrapper';
import { TxSuccessView } from '../FlowCommons/Success';
import {
  DetailsHFLine,
  DetailsIncentivesLine,
  DetailsNumberLine,
  TxModalDetails,
} from '../FlowCommons/TxModalDetails';
import { SupplyActions } from './SupplyActions';

export const SupplyModalContent = ({
  underlyingAsset,
  poolReserve,
  tokenBalance,
  symbol,
}: ModalWrapperProps) => {
  const { user } = useAppDataContext();
  const { mainTxState: supplyTxState, txError } = useModalContext();

  // states
  const [_amount, setAmount] = useState('');
  const amountRef = useRef<string>();

  const supplyApy = poolReserve.supplyAPY;

  // Calculate max amount to supply
  const maxAmountToSupply = tokenBalance;
  const isMaxSelected = _amount === '-1';
  const amount = isMaxSelected ? maxAmountToSupply.toString() : _amount;

  const handleChange = (value: string) => {
    const maxSelected = value === '-1';
    amountRef.current = maxSelected ? maxAmountToSupply.toString() : value;
    setAmount(value);
  };

  const amountInUsd = new BigNumber(amount).multipliedBy(poolReserve.priceInUSD);

  let healthFactorAfterDeposit = user ? valueToBigNumber(user.healthFactor) : '-1';

  if (supplyTxState.success)
    return (
      <TxSuccessView
        action={<Trans>Supplied</Trans>}
        amount={amountRef.current}
        symbol={poolReserve.symbol}
      />
    );

  return (
    <>
      <AssetInput
        value={amount}
        onChange={handleChange}
        usdValue={amountInUsd.toString(10)}
        symbol={poolReserve.symbol}
        assets={[
          {
            balance: maxAmountToSupply.toString(),
            symbol: poolReserve.symbol,
            iconSymbol: poolReserve.iconSymbol,
          },
        ]}
        capType={CapType.supplyCap}
        isMaxSelected={isMaxSelected}
        disabled={supplyTxState.loading}
        maxValue={maxAmountToSupply.toString()}
      />

      <TxModalDetails>
        <DetailsNumberLine description={<Trans>Supply APY</Trans>} value={supplyApy} percent />
        <DetailsIncentivesLine
          incentives={[]}
          symbol={poolReserve.symbol}
        />
        <DetailsHFLine
          visibleHfChange={!!_amount}
          healthFactor={user ? user.healthFactor : '-1'}
          futureHealthFactor={healthFactorAfterDeposit.toString(10)}
        />
      </TxModalDetails>

      {txError && <GasEstimationError txError={txError} />}

      <SupplyActions
        poolReserve={poolReserve}
        amountToSupply={amount}
        poolAddress={poolReserve.underlyingAsset}
        symbol={symbol}
      />
    </>
  );
};
