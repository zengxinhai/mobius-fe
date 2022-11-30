import React, {FC, PropsWithChildren, createContext, useEffect, useCallback, useContext, useState} from 'react'
import { Types } from 'aptos'
import {
  WalletProvider,
  AptosWalletAdapter,
  MartianWalletAdapter,
  useWallet, WalletAdapter,
} from '@manahippo/aptos-wallet-adapter'
import {useRootStore} from "../store/root";
import usePreviousState from 'src/hooks/usePreviousState';

export type Web3Data = {
  connectWallet: (adapter: WalletAdapter) => Promise<void>;
  disconnectWallet: () => Promise<void>;
  currentAccount: string;
  connected: boolean;
  connecting: boolean;
  chainId: number;
  sendTx: (txData: Types.TransactionPayload) => Promise<{ hash: Types.HexEncodedBytes }>;

  isWalletModalOpen: boolean;
  setWalletModalOpen: (open: boolean) => void;
};

export const web3Context = createContext<Web3Data>({} as Web3Data);

export const useWeb3Context = () => {
  return useContext(web3Context);
}

const Web3InnerProvider: FC<PropsWithChildren> = ({ children }) => {
  const aptosWallet = useWallet();
  const previousConnected = usePreviousState(aptosWallet.connected)
  const setAccount = useRootStore(state => state.setAccount);
  const connectWallet = useCallback((adapter: WalletAdapter) => {
    return aptosWallet.connect(adapter.name)
  }, [aptosWallet])

  useEffect(() => {
    const account = aptosWallet.account?.address?.toString()
    setAccount(account);
  }, [aptosWallet, setAccount])

  // Atomatically close the wallet modal after close
  useEffect(() => {
    if (aptosWallet.connected && !previousConnected) {
      setWalletModalOpen(false)
    }
  }, [aptosWallet.connected, previousConnected])


  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  
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
        isWalletModalOpen,
        setWalletModalOpen
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
