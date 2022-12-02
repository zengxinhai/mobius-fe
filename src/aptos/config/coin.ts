import { NetworkMode, CoinMeta } from "../types";
import { MOBIUS } from './resource-types';

const getFullType = (typeName: string) => `0x1::coin::CoinStore<${typeName}>`;

const devCoins: CoinMeta[] = [
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
].map(coin => ({ ...coin, type: getFullType(coin.type) }))

const testCoins: CoinMeta[] = [
  {
    name: "Aptos Coin",
    symbol: "APT",
    type: "0x1::aptos_coin::AptosCoin",
    decimal: 9
  },
].map(coin => ({ ...coin, type: getFullType(coin.type) }))

const mainCoins: CoinMeta[] = [
  {
    name: "Aptos Coin",
    symbol: "APT",
    type: "0x1::aptos_coin::AptosCoin",
    decimal: 9
  },
].map(coin => ({ ...coin, type: getFullType(coin.type) }))

export const COINS: Record<NetworkMode, CoinMeta[]> = { main: mainCoins, test: testCoins, dev: devCoins };
