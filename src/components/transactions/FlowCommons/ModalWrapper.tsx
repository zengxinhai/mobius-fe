import React from 'react';
import {
  UserReserveData,
  ReserveData,
  useAppDataContext,
} from 'src/hooks/useAppDataProvider';
import { useWalletBalances } from 'src/hooks/useWalletBalances';
import { useModalContext } from 'src/hooks/useModal';

import { TxModalTitle } from '../FlowCommons/TxModalTitle';
import { TxErrorView } from './Error';

export interface ModalWrapperProps {
  underlyingAsset: string;
  poolReserve: ReserveData;
  userReserve: UserReserveData;
  symbol: string;
  tokenBalance: string;
}

export const ModalWrapper: React.FC<{
  underlyingAsset: string;
  title: React.ReactNode;
  hideTitleSymbol?: boolean;
  children: (props: ModalWrapperProps) => React.ReactNode;
}> = ({
  hideTitleSymbol,
  underlyingAsset,
  children,
  title,
}) => {
  const { walletBalances } = useWalletBalances();
  const { userReserves, reserves } = useAppDataContext();
  const { txError, mainTxState } = useModalContext();

  if (txError) {
    return <TxErrorView txError={txError} />;
  }

  const poolReserve = reserves.find((reserve) => {
    return underlyingAsset === reserve.underlyingAsset;
  }) as ReserveData;

  const userReserve = userReserves.find((userReserve) => {
    return underlyingAsset === userReserve.underlyingAsset;
  }) as UserReserveData;

  const symbol = poolReserve.symbol;

  return (
    <>
      {!mainTxState.success && (
        <TxModalTitle title={title} symbol={hideTitleSymbol ? undefined : symbol} />
      )}
      {children({
        poolReserve,
        symbol,
        tokenBalance: walletBalances[poolReserve.underlyingAsset.toLowerCase()]?.amount || '0',
        underlyingAsset,
        userReserve,
      })}
    </>
  );
};
