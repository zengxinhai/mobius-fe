import {
  valueToBigNumber,
} from '@aave/math-utils';
import { Trans } from '@lingui/macro';
import { Box, Checkbox, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { Warning } from 'src/components/primitives/Warning';
import { useAppDataContext } from 'src/hooks/useAppDataProvider';
import { useModalContext } from 'src/hooks/useModal';

import { CapType } from '../../caps/helper';
import { AssetInput } from '../AssetInput';
import { GasEstimationError } from '../FlowCommons/GasEstimationError';
import { ModalWrapperProps } from '../FlowCommons/ModalWrapper';
import { TxSuccessView } from '../FlowCommons/Success';
import {
  DetailsHFLine,
  DetailsIncentivesLine,
  TxModalDetails,
} from '../FlowCommons/TxModalDetails';
import { BorrowActions } from './BorrowActions';
import BigNumber from "bignumber.js";

export const BorrowModalContent = ({
  poolReserve,
  userReserve,
  symbol,
}: ModalWrapperProps) => {
  const { mainTxState: borrowTxState, txError } = useModalContext();
  const { user } = useAppDataContext();

  const [_amount, setAmount] = useState('');
  const [riskCheckboxAccepted, setRiskCheckboxAccepted] = useState(false);
  const amountRef = useRef<string>();

  // amount calculations
  const maxAmountToBorrow = userReserve.borrowableAmount;
  const formattedMaxAmountToBorrow = maxAmountToBorrow;

  const isMaxSelected = _amount === '-1';
  const amount = isMaxSelected ? maxAmountToBorrow : _amount;

  // We set this in a useEffect, so it doesn't constantly change when
  // max amount selected
  const handleChange = (_value: string) => {
    const maxSelected = _value === '-1';
    const value = maxSelected ? maxAmountToBorrow.toString() : _value;
    amountRef.current = value;
    setAmount(value);
  };

  /// TODO: calculate real health factor
  const newHealthFactor = BigNumber(user.healthFactor);
  const displayRiskCheckbox =
    newHealthFactor.toNumber() < 1.5 && newHealthFactor.toString() !== '-1';

  // calculating input usd value
  const usdValue = valueToBigNumber(amount).multipliedBy(poolReserve.priceInUSD);

  if (borrowTxState.success)
    return (
      <TxSuccessView
        action={<Trans>Borrowed</Trans>}
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
        assets={[
          {
            balance: formattedMaxAmountToBorrow,
            symbol: symbol,
            iconSymbol: poolReserve.iconSymbol,
          },
        ]}
        symbol={symbol}
        capType={CapType.borrowCap}
        isMaxSelected={isMaxSelected}
        maxValue={maxAmountToBorrow}
      />

      <TxModalDetails>
        <DetailsIncentivesLine incentives={[]} symbol={poolReserve.symbol} />
        <DetailsHFLine
          visibleHfChange={!!_amount}
          healthFactor={user.healthFactor}
          futureHealthFactor={newHealthFactor.toString(10)}
        />
      </TxModalDetails>

      {txError && <GasEstimationError txError={txError} />}

      {displayRiskCheckbox && (
        <>
          <Warning severity="error" sx={{ my: 6 }}>
            <Trans>
              Borrowing this amount will reduce your health factor and increase risk of liquidation.
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
              data-cy={'risk-checkbox'}
            />
            <Typography variant="description">
              <Trans>I acknowledge the risks involved.</Trans>
            </Typography>
          </Box>
        </>
      )}

      <BorrowActions
        amountToBorrow={amount}
        symbol={symbol}
        poolReserve={poolReserve}
        sx={displayRiskCheckbox ? { mt: 0 } : {}}
      />
    </>
  );
};
