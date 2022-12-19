import { MOBIUS } from './resource-types';

export type CoinMeta = {
  name: string
  symbol: string
  type: string
  decimal: number
}

export const decimals = {
  ["0x1::aptos_coin::AptosCoin"]: 8,
  [`${MOBIUS}::MBTC::MBTC`]: 9,
  [`${MOBIUS}::METH::METH`]: 9,
  [`${MOBIUS}::MUSDT::MUSDT`]: 9,
}

export const devCoins: CoinMeta[] = [
  {
    name: "Aptos Coin",
    symbol: "APT",
    type: "0x1::aptos_coin::AptosCoin",
  },
  {
    name: "MBTC",
    symbol: "BTC",
    type: `${MOBIUS}::MBTC::MBTC`,
  },
  {
    name: "METH",
    symbol: "ETH",
    type: `${MOBIUS}::METH::METH`,
  },
  {
    name: "MUSDT",
    symbol: "USDT",
    type: `${MOBIUS}::MUSDT::MUSDT`,
  },
].map(item => ({ ...item, decimal: decimals[item.type] }))

export const testCoins: CoinMeta[] = [
  {
    name: "Aptos Coin",
    symbol: "APT",
    type: "0x1::aptos_coin::AptosCoin",
  },
  {
    name: "MBTC",
    symbol: "BTC",
    type: `${MOBIUS}::MBTC::MBTC`,
  },
  {
    name: "METH",
    symbol: "ETH",
    type: `${MOBIUS}::METH::METH`,
  },
  {
    name: "MUSDT",
    symbol: "USDT",
    type: `${MOBIUS}::MUSDT::MUSDT`,
  },
].map(item => ({ ...item, decimal: decimals[item.type] }))

export const mainCoins: CoinMeta[] = [
  {
    name: "Aptos Coin",
    symbol: "APT",
    type: "0x1::aptos_coin::AptosCoin",
    decimal: 9
  },
];
