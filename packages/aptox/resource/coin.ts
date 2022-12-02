import { AptosClient, MaybeHexString } from "aptos";
import { getResource } from './resource'

type CoinResource = {
  coin: {
    value: number
  }
}
export async function checkBalance(address: MaybeHexString, coinType: string, client: AptosClient) {
  const formattedCoinType = formatCoinType(coinType);
  const res = await getResource<CoinResource>(address, formattedCoinType, client);
  return res.ok ? res.data.coin.value : 0;
}

export async function checkBalances(address: MaybeHexString, coinTypes: string[], client: AptosClient) {
  return await Promise.all(
    coinTypes.map(coinType => checkBalance(address, coinType, client))
  )
}

function formatCoinType(coinType: string): string {
  return coinType.startsWith('0x1::coin') ? coinType : `0x1::coin::CoinStore<${coinType}>`
}
