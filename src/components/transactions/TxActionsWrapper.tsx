import { Trans } from '@lingui/macro';
import { Box, BoxProps, Button, CircularProgress } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import { ReactNode } from 'react';
import { TxStateType } from 'src/hooks/useModal';

interface TxActionsWrapperProps extends BoxProps {
  actionInProgressText: ReactNode;
  actionText: ReactNode;
  amount?: string;
  handleAction: () => Promise<void>;
  mainTxState: TxStateType;
  preparingTransactions: boolean;
  requiresAmount?: boolean;
  symbol?: string;
}

export const TxActionsWrapper = ({
  actionInProgressText,
  actionText,
  amount,
  handleAction,
  mainTxState,
  preparingTransactions,
  requiresAmount,
  sx,
  symbol,
  ...rest
}: TxActionsWrapperProps) => {
  const isAmountMissing = requiresAmount && requiresAmount && Number(amount) === 0;
  
  function getMainParams() {
    if (isAmountMissing) return { disabled: true, content: <Trans>Enter an amount</Trans> };
    if (preparingTransactions || isEmpty(mainTxState)) return { disabled: true, loading: true };
    if (mainTxState?.loading)
      return { loading: true, disabled: true, content: actionInProgressText };
    return { content: actionText, handleClick: handleAction };
  }


  const { content, disabled, loading, handleClick } = getMainParams();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 12, ...sx }} {...rest}>
      <Button
        variant="contained"
        disabled={disabled }
        onClick={handleClick}
        size="large"
        sx={{ minHeight: '44px' }}
        data-cy="actionButton"
      >
        {loading && <CircularProgress color="inherit" size="16px" sx={{ mr: 2 }} />}
        {content}
      </Button>
    </Box>
  );
};
