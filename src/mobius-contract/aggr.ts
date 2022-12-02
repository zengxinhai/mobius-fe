import { aptox } from './aptox';
import { devCoins } from './coin-config';
import * as query from './query';

export const getAllData = async (address: string) => {
  const coinBalances = aptox.checkBalances(devCoins.map(coin => coin.type));
  const assetOverview = query.getCurrentAssetsOverview();
  const rateList = query.getCurrentRateList();
  const priceList = query.getCurrentToUsdPriceList();
  const userAssets = query.getUserAssets(address);
  const borrowableAmountsList = query.getCurrentBorrowableAmountsList(address);
  return Promise.all([
    coinBalances,
    assetOverview,
    rateList,
    priceList,
    userAssets,
    borrowableAmountsList,
  ])
}

(async () => {
  const address = 'bebaf664c81aa143a87105a5144cc8c0f9ee6b222adb7b2d2a5265ec0ae71f4e';
  const start = Date.now();
  const allData = await getAllData(address);
  const end = Date.now();
  console.log(allData);
  console.log('time', (end - start)/1000)
})()
