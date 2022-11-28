import { createContext, useContext, useState } from 'react';
import { TxErrorType } from 'src/models/error';

export enum ModalType {
  Supply,
  Withdraw,
  Borrow,
  Repay,
  Faucet,
}

export interface ModalArgsType {
  underlyingAsset?: string;
}

export type TxStateType = {
  txHash?: string;
  // txError?: string;
  loading?: boolean;
  success?: boolean;
};

export interface ModalContextType<T extends ModalArgsType> {
  openSupply: (underlyingAsset: string) => void;
  openWithdraw: (underlyingAsset: string) => void;
  openBorrow: (underlyingAsset: string) => void;
  openRepay: (underlyingAsset: string) => void;
  openFaucet: (underlyingAsset: string) => void;
  close: () => void;
  type?: ModalType;
  args: T;
  mainTxState: TxStateType;
  approvalTxState: TxStateType;
  setApprovalTxState: (data: TxStateType) => void;
  setMainTxState: (data: TxStateType) => void;
  gasLimit: string;
  setGasLimit: (limit: string) => void;
  loadingTxns: boolean;
  setLoadingTxns: (loading: boolean) => void;
  txError: TxErrorType | undefined;
  setTxError: (error: TxErrorType | undefined) => void;
  retryWithApproval: boolean;
  setRetryWithApproval: (permit: boolean) => void;
}

export const ModalContext = createContext<ModalContextType<ModalArgsType>>(
  {} as ModalContextType<ModalArgsType>
);

export const ModalContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // contains the current modal open state if any
  const [type, setType] = useState<ModalType>();
  // contains arbitrary key-value pairs as a modal context
  const [args, setArgs] = useState<ModalArgsType>({});
  const [approvalTxState, setApprovalTxState] = useState<TxStateType>({});
  const [retryWithApproval, setRetryWithApproval] = useState<boolean>(false);
  const [mainTxState, setMainTxState] = useState<TxStateType>({});
  const [gasLimit, setGasLimit] = useState<string>('');
  const [loadingTxns, setLoadingTxns] = useState(false);
  const [txError, setTxError] = useState<TxErrorType>();

  return (
    <ModalContext.Provider
      value={{
        openSupply: (underlyingAsset) => {
          setType(ModalType.Supply);
          setArgs({ underlyingAsset });
        },
        openWithdraw: (underlyingAsset) => {
          setType(ModalType.Withdraw);
          setArgs({ underlyingAsset });
        },
        openBorrow: (underlyingAsset) => {
          setType(ModalType.Borrow);
          setArgs({ underlyingAsset });
        },
        openRepay: (underlyingAsset) => {
          setType(ModalType.Repay);
          setArgs({ underlyingAsset });
        },
        openFaucet: (underlyingAsset) => {
          setType(ModalType.Faucet);
          setArgs({ underlyingAsset });
        },
        close: () => {
          setType(undefined);
          setArgs({});
          setMainTxState({});
          setApprovalTxState({});
          setGasLimit('');
          setTxError(undefined);
          setRetryWithApproval(false);
        },
        type,
        args,
        approvalTxState,
        mainTxState,
        setApprovalTxState,
        setMainTxState,
        gasLimit,
        setGasLimit,
        loadingTxns,
        setLoadingTxns,
        txError,
        setTxError,
        retryWithApproval,
        setRetryWithApproval,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }

  return context;
};
