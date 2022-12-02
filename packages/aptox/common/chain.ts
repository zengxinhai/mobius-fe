import { AptosClient, FaucetClient, MaybeHexString, TokenClient } from "aptos";

const APTOS_NODE_URL_MAIN = 'https://fullnode.mainnet.aptoslabs.com';
const APTOS_NODE_URL_TEST = 'https://fullnode.testnet.aptoslabs.com';
const APTOS_NODE_URL_DEV = 'https://fullnode.devnet.aptoslabs.com';
const APTOS_FAUCET_URL_DEV = 'https://faucet.devnet.aptoslabs.com';

export type AptosNet = "main" | "dev" | "test";

export const getAptosClients = (aptosNet: AptosNet = "dev") => {
  const isMainnet = aptosNet === "main";
  const isTestnet = aptosNet === "test";
  const aptosNodeUrl =  isMainnet
    ? APTOS_NODE_URL_MAIN
    : isTestnet
      ? APTOS_NODE_URL_TEST
      : APTOS_NODE_URL_DEV;
  const aptosClient = new AptosClient(aptosNodeUrl);
  const tokenClient = new TokenClient(aptosClient);
  return { aptosClient, tokenClient };
}

// For dev purpose, we need to fund our account with faucet.
export const fundAccountForDev = (address: MaybeHexString) => {
  const faucetClient = new FaucetClient(APTOS_NODE_URL_DEV, APTOS_FAUCET_URL_DEV);
  faucetClient.fundAccount(address, 100_000_000);
}
