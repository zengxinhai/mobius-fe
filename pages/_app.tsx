import '../styles/globals.css'
import { CacheProvider, EmotionCache } from '@emotion/react';
import createCache from '@emotion/cache';
import Head from 'next/head';
import MobiusLogo from 'public/logo.png';
import type { AppProps } from 'next/app'
import { Meta } from 'src/components/Meta'
import { MainLayout } from 'src/layouts/MainLayout'
import { AppGlobalStyles } from 'src/layouts/AppGlobalStyles';
import { LanguageProvider } from 'src/libs/LanguageProvider';
import Web3ContextProvider from 'src/libs/Web3Provider';
import AppDataProvider from 'src/hooks/useAppDataProvider';
import { ModalContextProvider } from 'src/hooks/useModal';
import { BorrowModal } from 'src/components/transactions/Borrow/BorrowModal';
import { RepayModal } from 'src/components/transactions/Repay/RepayModal';


// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Meta
        title={'Open Source Liquidity Protocol'}
        description={
          'Mobius is an Open Source Protocol to create Non-Custodial Liquidity Markets to earn interest on supplying and borrowing assets with a variable or stable interest rate. The protocol is designed for easy integration into your products and services.'
        }
        imageUrl={MobiusLogo.src}
      />
      <LanguageProvider>
        <AppGlobalStyles>
          <Web3ContextProvider>
            <AppDataProvider>
              <ModalContextProvider>
                <MainLayout>
                  <Component {...pageProps} />
                  <BorrowModal />
                  <RepayModal />
                </MainLayout>
              </ModalContextProvider>
            </AppDataProvider>
          </Web3ContextProvider>
        </AppGlobalStyles>
      </LanguageProvider>
    </CacheProvider>
  )
}
