import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AptosWalletProvider from 'src/aptos/wallet/wallet-provider';
import { AppGlobalStyles } from 'src/layouts/AppGlobalStyles';
import { LanguageProvider } from 'src/libs/LanguageProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <AppGlobalStyles>
        <AptosWalletProvider>
          <Component {...pageProps} />
        </AptosWalletProvider>
      </AppGlobalStyles>
    </LanguageProvider>
  )
}
