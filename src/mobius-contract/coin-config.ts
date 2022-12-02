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
    decimal: 9
  },
  {
    name: "MBTC",
    symbol: "MBTC",
    type: `${MOBIUS}::MBTC::MBTC`,
    decimal: 9
  },
  {
    name: "METH",
    symbol: "METH",
    type: `${MOBIUS}::METH::METH`,
    decimal: 9
  },
  {
    name: "MUSDT",
    symbol: "MUSDT",
    type: `${MOBIUS}::MUSDT::MUSDT`,
    decimal: 9
  },
];

export const testCoins: CoinMeta[] = [
  {
    name: "Aptos Coin",
    symbol: "APT",
    type: "0x1::aptos_coin::AptosCoin",
    decimal: 9
  },
];

export const mainCoins: CoinMeta[] = [
  {
    name: "Aptos Coin",
    symbol: "APT",
    type: "0x1::aptos_coin::AptosCoin",
    decimal: 9
  },
];
