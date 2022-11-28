const explorerLinkBuilder = (txHash?: string) => {
  txHash = txHash || '';
  return `https://explorer.aptoslabs.com/txn/${txHash}?network=Devnet`
}

export const useProtocolDataContext = () => {
  return {
    currentNetworkConfig: {
      explorerLinkBuilder
    }
  }
}
