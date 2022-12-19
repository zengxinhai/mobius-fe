import { aptox } from './aptox';
import { CoinMeta, testCoins } from './coin-config';
import * as query from './query';
import {
  convertAssetNftGallery,
  convertAssetsOverview,
  convertRateList,
  convertToUSDPriceList,
  convertBorrowableAmountsList,
} from './struct-converter'

function zip(coins: CoinMeta[], balances: number[]) {
  return coins.reduce((accu,coin, idx) => {
    return { ...accu, [coin.type]: balances[idx] }
  }, {} as Record<string, number>)
}

export const getAllData = async (address: string) => {
  const coinBalancesP = aptox.checkBalances(testCoins.map(coin => coin.type), address)
    .then(balances => zip(testCoins, balances))
  
  const assetOverviewP = query.getCurrentAssetsOverview()
    .then(res => res.ok ? convertAssetsOverview(res.data) : undefined);
  
  const rateListP = query.getCurrentRateList()
    .then(res => res.ok ? convertRateList(res.data) : undefined);
  
  const priceListP = query.getCurrentToUsdPriceList()
    .then(res => res.ok ? convertToUSDPriceList(res.data): undefined);
  
  const userAssetsP = query.getUserAssets(address)
    .then(res => res.ok ? convertAssetNftGallery(res.data) : undefined);
  
  const borrowableAmountsListP = query.getCurrentBorrowableAmountsList(address)
    .then(res => res.ok ? convertBorrowableAmountsList(res.data) : undefined)
  
  const [coinBalances, assetsOverview, rateList, priceList, userAssets, borrowableAmounts] = await Promise.all([
    coinBalancesP,
    assetOverviewP,
    rateListP,
    priceListP,
    userAssetsP,
    borrowableAmountsListP,
  ])
  return { coinBalances, assetsOverview, rateList, priceList, userAssets, borrowableAmounts }
}

export type AllData = Awaited<ReturnType<typeof getAllData>>
