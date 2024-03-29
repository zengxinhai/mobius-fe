import { Trans } from '@lingui/macro';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import React, { useRef, useState } from 'react';
import { useAppDataContext } from 'src/hooks/useAppDataProvider';
import { useModalContext } from 'src/hooks/useModal';

import { Asset, AssetInput } from '../AssetInput';
import { GasEstimationError } from '../FlowCommons/GasEstimationError';
import { ModalWrapperProps } from '../FlowCommons/ModalWrapper';
import { TxSuccessView } from '../FlowCommons/Success';
import {
  DetailsHFLine,
  DetailsNumberLineWithSub,
  TxModalDetails,
} from '../FlowCommons/TxModalDetails';
import { RepayActions } from './RepayActions';
import {useHealthFactorAfterRepay} from "../health-factor";

export const RepayModalContent = ({
  poolReserve,
  userReserve,
  symbol: modalSymbol,
  tokenBalance,
}: ModalWrapperProps) => {
  const { mainTxState: repayTxState, txError } = useModalContext();
  const { user } = useAppDataContext();

  const [repayMax, setRepayMax] = useState('');
  const [_amount, setAmount] = useState('');
  const amountRef = useRef<string>();

  const debt = userReserve?.variableBorrows || '0';
  const debtUSD = new BigNumber(debt)
    .multipliedBy(poolReserve.priceInUSD)

  const safeAmountToRepayAll = BigNumber(debt).multipliedBy('1.0025');

  // calculate max amount abailable to repay
  let maxAmountToRepay = BigNumber.min(tokenBalance, debt);

  const isMaxSelected = _amount === '-1';
  const amount = isMaxSelected ? maxAmountToRepay.toString(10) : _amount;

  const handleChange = (value: string) => {
    const maxSelected = value === '-1';
    amountRef.current = maxSelected ? maxAmountToRepay.toString(10) : value;
    setAmount(value);
    if (maxSelected && maxAmountToRepay.eq(debt)) {
      setRepayMax('-1');
    } else {
      setRepayMax(
        safeAmountToRepayAll.lt(tokenBalance)
          ? safeAmountToRepayAll.toString(10)
          : maxAmountToRepay.toString(10)
      );
    }
  };

  // debt remaining after repay
  const amountAfterRepay = BigNumber(debt)
    .minus(amount || '0')
    .toString(10);
  const displayAmountAfterRepay = BigNumber.min(amountAfterRepay, maxAmountToRepay);
  const displayAmountAfterRepayInUsd = displayAmountAfterRepay
    .multipliedBy(poolReserve.priceInUSD)

  const maxRepayWithDustRemaining = isMaxSelected && displayAmountAfterRepayInUsd.toNumber() > 0;

  const newHF = useHealthFactorAfterRepay(amount, poolReserve.priceInUSD)

  // calculating input usd value
  const usdValue = BigNumber(amount).multipliedBy(poolReserve.priceInUSD);

  if (repayTxState.success)
    return (
      <TxSuccessView
        action={<Trans>repaid</Trans>}
        amount={amountRef.current}
        symbol={poolReserve.symbol}
      />
    );

  return (
    <>
      <AssetInput
        value={amount}
        onChange={handleChange}
        usdValue={usdValue.toString(10)}
        symbol={poolReserve.symbol}
        isMaxSelected={isMaxSelected}
        assets={[{
          balance: tokenBalance,
          symbol: poolReserve.symbol,
          iconSymbol: poolReserve.iconSymbol,
        }]}
        maxValue={maxAmountToRepay.toString(10)}
      />

      {maxRepayWithDustRemaining && (
        <Typography color="warning.main" variant="helperText">
          <Trans>
            You don’t have enough funds in your wallet to repay the full amount. If you proceed to
            repay with your current amount of funds, you will still have a small borrowing position
            in your dashboard.
          </Trans>
        </Typography>
      )}

      <TxModalDetails>
        <DetailsNumberLineWithSub
          description={<Trans>Remaining debt</Trans>}
          futureValue={amountAfterRepay}
          futureValueUSD={displayAmountAfterRepayInUsd.toString(10)}
          value={debt}
          valueUSD={debtUSD.toString()}
          symbol={poolReserve.iconSymbol}
        />
        <DetailsHFLine
          visibleHfChange={!!_amount}
          healthFactor={user?.healthFactor}
          futureHealthFactor={newHF}
        />
      </TxModalDetails>

      {txError && <GasEstimationError txError={txError} />}

      <RepayActions
        poolReserve={poolReserve}
        amountToRepay={isMaxSelected ? repayMax : amount}
        symbol={modalSymbol}
      />
    </>
  );
};
