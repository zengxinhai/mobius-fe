import {
  WalletAdapter,
  AptosWalletName,
  MartianWalletName,
} from '@manahippo/aptos-wallet-adapter';

export const getWalletIcon = (adapter: WalletAdapter) => {
  const walletName = adapter.name;
  if (walletName === AptosWalletName) {
    return '/icons/wallets/petra.svg'
  } else if (walletName === MartianWalletName) {
    return '/icons/wallets/martian.png'
  }
  return '/icons/wallets/petra.svg'
}