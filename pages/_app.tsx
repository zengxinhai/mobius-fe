import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Web3ContextProvider from 'src/libs/Web3Provider';
import { AppGlobalStyles } from 'src/layouts/AppGlobalStyles';
import { LanguageProvider } from 'src/libs/LanguageProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <AppGlobalStyles>
        <Web3ContextProvider>
          <Component {...pageProps} />
        </Web3ContextProvider>
      </AppGlobalStyles>
    </LanguageProvider>
  )
}
