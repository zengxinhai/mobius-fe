import { ReserveIncentiveResponse } from '@aave/math-utils/dist/esm/formatters/incentive/calculate-reserve-incentives';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Trans } from '@lingui/macro';
import { Box, FormControlLabel, SvgIcon, Switch, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

import { HealthFactorNumber } from '../../HealthFactorNumber';
import { IncentivesButton } from '../../incentives/IncentivesButton';
import { FormattedNumber, FormattedNumberProps } from '../../primitives/FormattedNumber';
import { Row } from '../../primitives/Row';
import { TokenIcon } from '../../primitives/TokenIcon';

export const TxModalDetails: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ pt: 5 }}>
      <Typography sx={{ mb: 1 }} color="text.secondary">
        <Trans>Transaction overview</Trans>
      </Typography>

      <Box
        sx={(theme) => ({
          p: 3,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: '4px',
          '.MuiBox-root:last-of-type': {
            mb: 0,
          },
        })}
      >
        {children}
      </Box>
    </Box>
  );
};

interface DetailsNumberLineProps extends FormattedNumberProps {
  description: ReactNode;
  value: FormattedNumberProps['value'];
  futureValue?: FormattedNumberProps['value'];
  numberPrefix?: ReactNode;
  iconSymbol?: string;
}

export const DetailsNumberLine = ({
  description,
  value,
  futureValue,
  numberPrefix,
  iconSymbol,
  ...rest
}: DetailsNumberLineProps) => {
  return (
    <Row caption={description} captionVariant="description" mb={4}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {iconSymbol && <TokenIcon symbol={iconSymbol} sx={{ mr: 1, fontSize: '16px' }} />}
        {numberPrefix && <Typography sx={{ mr: 1 }}>{numberPrefix}</Typography>}
        <FormattedNumber value={value} variant="secondary14" {...rest} />
        {futureValue && (
          <>
            <SvgIcon color="primary" sx={{ fontSize: '14px', mx: 1 }}>
              <ArrowRightIcon />
            </SvgIcon>
            <FormattedNumber value={futureValue} variant="secondary14" {...rest} />
          </>
        )}
      </Box>
    </Row>
  );
};

interface DetailsNumberLineWithSubProps {
  description: ReactNode;
  symbol: ReactNode;
  value?: string;
  valueUSD?: string;
  futureValue: string;
  futureValueUSD: string;
  hideSymbolSuffix?: boolean;
  color?: string;
}

export const DetailsNumberLineWithSub = ({
  description,
  symbol,
  value,
  valueUSD,
  futureValue,
  futureValueUSD,
  hideSymbolSuffix,
  color,
}: DetailsNumberLineWithSubProps) => {
  return (
    <Row caption={description} captionVariant="description" mb={4} align="flex-start">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {value && (
            <>
              <FormattedNumber value={value} variant="secondary14" color={color} />
              {!hideSymbolSuffix && (
                <Typography ml={1} variant="secondary14">
                  {symbol}
                </Typography>
              )}
              <SvgIcon color="primary" sx={{ fontSize: '14px', mx: 1 }}>
                <ArrowRightIcon />
              </SvgIcon>
            </>
          )}
          <FormattedNumber value={futureValue} variant="secondary14" color={color} />
          {!hideSymbolSuffix && (
            <Typography ml={1} variant="secondary14">
              {symbol}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {valueUSD && (
            <>
              <FormattedNumber value={valueUSD} variant="helperText" compact symbol="USD" />
              <SvgIcon color="primary" sx={{ fontSize: '14px', mx: 1 }}>
                <ArrowRightIcon />
              </SvgIcon>
            </>
          )}
          <FormattedNumber value={futureValueUSD} variant="helperText" compact symbol="USD" />
        </Box>
      </Box>
    </Row>
  );
};

interface DetailsIncentivesLineProps {
  futureIncentives?: ReserveIncentiveResponse[];
  futureSymbol?: string;
  incentives?: ReserveIncentiveResponse[];
  // the token yielding the incentive, not the incentive itself
  symbol: string;
}

export const DetailsIncentivesLine = ({
  incentives,
  symbol,
  futureIncentives,
  futureSymbol,
}: DetailsIncentivesLineProps) => {
  if (!incentives || incentives.filter((i) => i.incentiveAPR !== '0').length === 0) return null;
  return (
    <Row caption={<Trans>Rewards APR</Trans>} captionVariant="description" mb={4} minHeight={24}>
      <IncentivesButton incentives={incentives} symbol={symbol} />
      {futureSymbol && (
        <>
          <SvgIcon color="primary" sx={{ fontSize: '14px', mx: 1 }}>
            <ArrowRightIcon />
          </SvgIcon>
          <IncentivesButton incentives={futureIncentives} symbol={futureSymbol} />
        </>
      )}
    </Row>
  );
};

export interface DetailsHFLineProps {
  healthFactor: string;
  futureHealthFactor: string;
  visibleHfChange: boolean;
}

export const DetailsHFLine = ({
  healthFactor,
  futureHealthFactor,
  visibleHfChange,
}: DetailsHFLineProps) => {
  if (healthFactor === '-1' && futureHealthFactor === '-1') return null;
  return (
    <Row
      caption={<Trans>Health factor</Trans>}
      captionVariant="description"
      mb={4}
      align="flex-start"
    >
      <Box sx={{ textAlign: 'right' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <HealthFactorNumber value={healthFactor} variant="secondary14" />

          {visibleHfChange && (
            <>
              <SvgIcon color="primary" sx={{ fontSize: '14px', mx: 1 }}>
                <ArrowRightIcon />
              </SvgIcon>

              <HealthFactorNumber
                value={Number(futureHealthFactor) ? futureHealthFactor : healthFactor}
                variant="secondary14"
              />
            </>
          )}
        </Box>

        <Typography variant="helperText" color="text.secondary">
          <Trans>Liquidation at</Trans>
          {' <1.0'}
        </Typography>
      </Box>
    </Row>
  );
};

export interface DetailsUnwrapSwitchProps {
  unwrapped: boolean;
  setUnWrapped: (value: boolean) => void;
  symbol: string;
  unwrappedSymbol: string;
}

export const DetailsUnwrapSwitch = ({
  unwrapped,
  setUnWrapped,
  symbol,
  unwrappedSymbol,
}: DetailsUnwrapSwitchProps) => {
  return (
    <Row captionVariant="description" mb={4}>
      <FormControlLabel
        value="darkmode"
        control={
          <Switch
            disableRipple
            checked={unwrapped}
            onClick={() => setUnWrapped(!unwrapped)}
            data-cy={'wrappedSwitcher'}
          />
        }
        labelPlacement="end"
        label={''}
      />
      <Typography>{`Unwrap ${symbol} (to withdraw ${unwrappedSymbol})`}</Typography>
    </Row>
  );
};
