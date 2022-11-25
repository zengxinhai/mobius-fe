import React, {FC, PropsWithChildren, createContext, useEffect, useCallback} from 'react'
import { Types } from 'aptos'
import {
  WalletProvider,
  AptosWalletAdapter,
  MartianWalletAdapter,
  useWallet,
} from '@manahippo/aptos-wallet-adapter'
import {useRootStore} from "../store/root";

export type Web3Data = {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  currentAccount: string;
  connected: boolean;
  connecting: boolean;
  chainId: number;
  sendTx: (txData: Types.TransactionPayload) => Promise<{ hash: Types.HexEncodedBytes }>;
};

export const web3Context = createContext<Web3Data>({} as Web3Data);

const Web3InnerProvider: FC<PropsWithChildren> = ({ children }) => {
  const aptosWallet = useWallet();
  const setAccount = useRootStore(state => state.setAccount);
  const connectWallet = useCallback(() => {
    return aptosWallet.connect(new AptosWalletAdapter().name)
  }, [aptosWallet])
  
  useEffect(() => {
    const account = aptosWallet.account?.address?.toString()
    setAccount(account);
  }, [aptosWallet.account, setAccount])
  
  return (
    <web3Context.Provider
      value={{
        connectWallet,
        disconnectWallet: aptosWallet.disconnect,
        currentAccount: aptosWallet.account?.address?.toString() || '',
        connecting: aptosWallet.connecting,
        connected: aptosWallet.connected,
        chainId: aptosWallet.network?.chainId ? Number(aptosWallet.network.chainId) : 1,
        sendTx: aptosWallet.signAndSubmitTransaction,
      }}
    >
      {children}
    </web3Context.Provider>
  );
};

export const supportWallets = [
  new AptosWalletAdapter(),
  new MartianWalletAdapter()
];

const Web3ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <WalletProvider
      wallets={supportWallets}
      autoConnect={true} /** allow auto wallet connection or not **/
      onError={(error: Error) => {
        console.log('Handle Error Message', error);
      }}>
      <Web3InnerProvider>
        { children }
      </Web3InnerProvider>
    </WalletProvider>
  );
}

export default Web3ContextProvider;
