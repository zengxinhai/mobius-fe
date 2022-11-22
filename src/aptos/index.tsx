import React from 'react';
import AptosWalletProvider from './wallet/wallet-provider';
import { AptosStateProvider } from "./store/state";
import { AppHeader } from "src/layouts/AppHeader";

const App: React.FC = () => {
  return (
    <AptosWalletProvider>
      <AptosStateProvider>
        <AppHeader />
      </AptosStateProvider>
    </AptosWalletProvider>
  );
};

export default App;
