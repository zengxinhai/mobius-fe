type WalletBalance = {
  amount: string
  amountUSD: string
}

export const useWalletBalances = () => {
  const walletBalances: Record<string, WalletBalance> = {
    "0x1::coin::Bitcoin": {
      amount: '1.2',
      amountUSD: '18300',
    },
    "0x1::coin::Aptos": {
      amount: '200.12',
      amountUSD: '980',
    },
  };
  return {
    loading: false,
    walletBalances,
  }
}
