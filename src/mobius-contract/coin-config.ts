import { MOBIUS } from './resource-types';

export type CoinMeta = {
  name: string
  symbol: string
  type: string
  decimal: number
}

export const devCoins: CoinMeta[] = [
  {
    name: "Aptos Coin",
    symbol: "APT",
    type: "0x1::aptos_coin::AptosCoin",
    decimal: 8
  },
  {
    name: "MBTC",
    symbol: "BTC",
    type: `${MOBIUS}::MBTC::MBTC`,
    decimal: 8
  },
  {
    name: "METH",
    symbol: "ETH",
    type: `${MOBIUS}::METH::METH`,
    decimal: 8
  },
  {
    name: "MUSDT",
    symbol: "USDT",
    type: `${MOBIUS}::MUSDT::MUSDT`,
    decimal: 8
  },
];

export const testCoins: CoinMeta[] = [
  {
    name: "Aptos Coin",
    symbol: "APT",
    type: "0x1::aptos_coin::AptosCoin",
    decimal: 8
  },
];

export const mainCoins: CoinMeta[] = [
  {
    name: "Aptos Coin",
    symbol: "APT",
    type: "0x1::aptos_coin::AptosCoin",
    decimal: 8
  },
];
