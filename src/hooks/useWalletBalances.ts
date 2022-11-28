type WalletBalance = {
  amount: string
  amountUSD: string
}

export const useWalletBalances = () => {
  const walletBalances: Record<string, WalletBalance> = {
    "0x2::coin::bitcoin": {
      amount: '1.2',
      amountUSD: '18300',
    },
    "0x2::coin::aptos": {
      amount: '3312',
      amountUSD: '13200',
    },
  };
  return {
    loading: false,
    walletBalances,
  }
}
