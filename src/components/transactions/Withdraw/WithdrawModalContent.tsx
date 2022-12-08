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
import {useHealthFactorAfterWithdraw} from "../health-factor";
import {useMaxWithdrawAmount} from "./hooks";

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
  const underlyingBalance = BigNumber(userReserve?.underlyingBalance || '0');
  let maxAmountToWithdraw = useMaxWithdrawAmount(userReserve);

  const isMaxSelected = _amount === '-1';
  const amount = isMaxSelected ? maxAmountToWithdraw : _amount;

  const handleChange = (value: string) => {
    const maxSelected = value === '-1';
    amountRef.current = maxSelected ? maxAmountToWithdraw : value;
    setAmount(value);
    if (maxSelected && underlyingBalance.eq(maxAmountToWithdraw)) {
      setWithdrawMax('-1');
    } else {
      setWithdrawMax(maxAmountToWithdraw.toString());
    }
  };

  // health factor calculations
  let healthFactorAfterWithdraw = useHealthFactorAfterWithdraw(amount, poolReserve.priceInUSD);

  const displayRiskCheckbox = Number(healthFactorAfterWithdraw) < 1.5

  // calculating input usd value
  const usdValue = BigNumber(amount).multipliedBy(userReserve?.reserve.priceInUSD || 0);
  
  const blocked = (displayRiskCheckbox && !riskCheckboxAccepted) || BigNumber(amount).gt(maxAmountToWithdraw)

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
            balance: maxAmountToWithdraw,
            symbol: symbol,
            iconSymbol: poolReserve.iconSymbol},
        ]}
        usdValue={usdValue.toString(10)}
        isMaxSelected={isMaxSelected}
        disabled={withdrawTxState.loading}
        maxValue={maxAmountToWithdraw}
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
          futureHealthFactor={healthFactorAfterWithdraw}
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
        blocked={blocked}
        poolReserve={poolReserve}
        amountToWithdraw={isMaxSelected ? withdrawMax : amount}
        poolAddress={poolReserve.underlyingAsset}
        symbol={symbol}
        sx={displayRiskCheckbox ? { mt: 0 } : {}}
      />
    </>
  );
};
