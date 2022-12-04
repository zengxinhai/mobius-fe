import { aptox } from './aptox';
import { CoinMeta, devCoins } from './coin-config';
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
  const coinBalances = aptox.checkBalances(devCoins.map(coin => coin.type), address)
    .then(balances => zip(devCoins, balances))
  
  const assetOverview = query.getCurrentAssetsOverview()
    .then(res => res.ok ? convertAssetsOverview(res.data) : undefined);
  
  const rateList = query.getCurrentRateList()
    .then(res => res.ok ? convertRateList(res.data) : undefined);
  
  const priceList = query.getCurrentToUsdPriceList()
    .then(res => res.ok ? convertToUSDPriceList(res.data): undefined);
  
  const userAssets = query.getUserAssets(address)
    .then(res => res.ok ? convertAssetNftGallery(res.data) : undefined);
  
  const borrowableAmountsList = query.getCurrentBorrowableAmountsList(address)
    .then(res => res.ok ? convertBorrowableAmountsList(res.data) : undefined)
  
  return Promise.all([
    coinBalances,
    assetOverview,
    rateList,
    priceList,
    userAssets,
    borrowableAmountsList,
  ])
}
