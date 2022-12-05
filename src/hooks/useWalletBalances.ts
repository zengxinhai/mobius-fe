import {useRootStore} from "../store/root";

export const useWalletBalances = () => {
  const walletBalances = useRootStore(state => state.walletBalances)
  return {
    loading: false,
    walletBalances,
  }
}
