import { valueToBigNumber } from '@aave/math-utils';
import { Trans } from '@lingui/macro';
import { Box, Checkbox, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { useRef, useState } from 'react';
import { Warning } from 'src/components/primitives/Warning';
import { useAppDataContext } from 'src/hooks/useAppDataProvider';
import { useModalContext } from 'src/hooks/useModal';

import { AssetInput } from '../AssetInput';
import { GasEstimationError } from '../FlowCommons/GasEstimationError';
import { ModalWrapperProps } from '../FlowCommons/ModalWrapper';
import { TxSuccessView } from '../FlowCommons/Success';
import {
  DetailsHFLine,
  DetailsNumberLine,
  TxModalDetails,
} from '../FlowCommons/TxModalDetails';
import { WithdrawActions } from './WithdrawActions';

export const WithdrawModalContent = ({
  poolReserve,
  userReserve,
  symbol,
}: ModalWrapperProps) => {
  const { mainTxState: withdrawTxState, txError } = useModalContext();
  const { user } = useAppDataContext();

  const [_amount, setAmount] = useState('');
  const [withdrawMax, setWithdrawMax] = useState('');
  const [riskCheckboxAccepted, setRiskCheckboxAccepted] = useState(false);
  const amountRef = useRef<string>();

  // calculations
  const underlyingBalance = valueToBigNumber(userReserve?.underlyingBalance || '0');
  const unborrowedLiquidity = valueToBigNumber(poolReserve.unborrowedLiquidity);
  let maxAmountToWithdraw = BigNumber.min(underlyingBalance, unborrowedLiquidity);

  const isMaxSelected = _amount === '-1';
  const amount = isMaxSelected ? maxAmountToWithdraw.toString(10) : _amount;

  const handleChange = (value: string) => {
    const maxSelected = value === '-1';
    amountRef.current = maxSelected ? maxAmountToWithdraw.toString(10) : value;
    setAmount(value);
    if (maxSelected && maxAmountToWithdraw.eq(underlyingBalance)) {
      setWithdrawMax('-1');
    } else {
      setWithdrawMax(maxAmountToWithdraw.toString(10));
    }
  };

  // health factor calculations
  let healthFactorAfterWithdraw = valueToBigNumber(user.healthFactor);

  const displayRiskCheckbox =
    healthFactorAfterWithdraw.toNumber() >= 1 &&
    healthFactorAfterWithdraw.toNumber() < 1.5

  // calculating input usd value
  const usdValue = valueToBigNumber(amount).multipliedBy(userReserve?.reserve.priceInUSD || 0);

  if (withdrawTxState.success)
    return (
      <TxSuccessView
        action={<Trans>withdrew</Trans>}
        amount={amountRef.current}
        symbol={poolReserve.symbol}
      />
    );

  return (
    <>
      <AssetInput
        value={amount}
        onChange={handleChange}
        symbol={symbol}
        assets={[
          {
            balance: maxAmountToWithdraw.toString(10),
            symbol: symbol,
            iconSymbol: poolReserve.iconSymbol},
        ]}
        usdValue={usdValue.toString(10)}
        isMaxSelected={isMaxSelected}
        disabled={withdrawTxState.loading}
        maxValue={maxAmountToWithdraw.toString(10)}
      />

      <TxModalDetails>
        <DetailsNumberLine
          description={<Trans>Remaining supply</Trans>}
          value={underlyingBalance.minus(amount || '0').toString(10)}
          symbol={poolReserve.symbol}
        />
        <DetailsHFLine
          visibleHfChange={!!_amount}
          healthFactor={user ? user.healthFactor : '-1'}
          futureHealthFactor={healthFactorAfterWithdraw.toString(10)}
        />
      </TxModalDetails>

      {txError && <GasEstimationError txError={txError} />}

      {displayRiskCheckbox && (
        <>
          <Warning severity="error" sx={{ my: 6 }}>
            <Trans>
              Withdrawing this amount will reduce your health factor and increase risk of
              liquidation.
            </Trans>
          </Warning>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              mx: '24px',
              mb: '12px',
            }}
          >
            <Checkbox
              checked={riskCheckboxAccepted}
              onChange={() => setRiskCheckboxAccepted(!riskCheckboxAccepted)}
              size="small"
              data-cy={`risk-checkbox`}
            />
            <Typography variant="description">
              <Trans>I acknowledge the risks involved.</Trans>
            </Typography>
          </Box>
        </>
      )}

      <WithdrawActions
        poolReserve={poolReserve}
        amountToWithdraw={isMaxSelected ? withdrawMax : amount}
        poolAddress={poolReserve.underlyingAsset}
        symbol={symbol}
        sx={displayRiskCheckbox ? { mt: 0 } : {}}
      />
    </>
  );
};
