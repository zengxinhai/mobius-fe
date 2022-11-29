import '../styles/globals.css'
import { MainLayout } from 'src/layouts/MainLayout'
import type { AppProps } from 'next/app'
import { AppGlobalStyles } from 'src/layouts/AppGlobalStyles';
import { LanguageProvider } from 'src/libs/LanguageProvider';
import Web3ContextProvider from 'src/libs/Web3Provider';
import AppDataProvider from 'src/hooks/useAppDataProvider';
import { ModalContextProvider } from 'src/hooks/useModal';
import { BorrowModal } from 'src/components/transactions/Borrow/BorrowModal';
import { RepayModal } from 'src/components/transactions/Repay/RepayModal';

export default function App({ Component, pageProps }: AppProps) {
  return (
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
  )
}
