import { StateCreator } from 'zustand'
import { RootState } from './root'
import { getAllData } from "../mobius-contract/aggr";
import { devCoins } from '../mobius-contract/coin-config';
import { LIQUIDATION_FACTOR } from '../mobius-contract/config';
import {ReserveData, emptyReserve, UserReserveData} from "./types";

export interface DataRefreshSlice {
  refreshAppData: () => Promise<void>,
}

export const createDataRefreshSlice: StateCreator<
  RootState,
  [['zustand/devtools', never]],
  [],
  DataRefreshSlice
  > = (set, get) => {
  const refreshAppData = async () => {
    const account = get().account;
    if (!account) return;
    const [
      coinBalances,
      assetOverview,
      rateList,
      priceList,
      userAssets,
      borrowableAmountsList] = await getAllData(account);
    
    get().setWalletBalances(coinBalances);
    
    assetOverview && get().setOverview({
      totalMarketSizeUSD: assetOverview.totalSuppliedUSD,
      totalBorrowsUSD: assetOverview.totalBorrowedUSD,
      totalAvailableUSD: assetOverview.totalSuppliedUSD - assetOverview.totalBorrowedUSD
    })
    
    const reserves: Record<string, ReserveData> = devCoins.reduce((accu, coin) => {
      const reserve = {
        ...emptyReserve,
        name: coin.name,
        symbol: coin.symbol,
        iconSymbol: coin.symbol,
        decimals: coin.decimal,
        underlyingAsset: coin.type
      }
      return {...accu, [coin.type]: reserve}
    }, {} as Record<string, ReserveData>);
    
    rateList && rateList.forEach(rate => {
      const reserve = reserves[rate.tokenType];
      if (reserve) {
        reserve.variableBorrowAPY = rate.borrowAPY.toString()
        reserve.supplyAPY = rate.supplyAPY.toString()
        reserve.variableBorrowRate = rate.borrowAPY.toString()
      }
    })
    
    borrowableAmountsList && borrowableAmountsList.forEach(amountInfo => {
      const reserve = reserves[amountInfo.tokenType];
      if (reserve) {
        reserve.availableBorrows = amountInfo.borrowableAmount;
        reserve.totalBorrows = amountInfo.borrowedAmount.toString();
        reserve.totalDebt = amountInfo.borrowableAmount;
        reserve.borrowUsageRatio = (amountInfo.borrowedAmount / (amountInfo.borrowableAmount + amountInfo.borrowedAmount)).toString();
        reserve.unborrowedLiquidity = amountInfo.borrowableAmount;
        reserve.totalLiquidity = amountInfo.borrowableAmount;
      }
    })
    
    priceList && priceList.forEach(price => {
      const reserve = reserves[price.tokenType];
      if (reserve) {
        reserve.priceInUSD = price.tokenPriceUSD.toString();
        reserve.availableBorrowsInUSD = Number(reserve.availableBorrows) * Number(reserve.priceInUSD);
        reserve.totalDebtUSD = (Number(reserve.totalDebt) * Number(reserve.priceInUSD)).toString();
        reserve.totalLiquidityUSD = (Number(reserve.totalLiquidity) * Number(reserve.priceInUSD)).toString();
      }
    })
    
    const userReserves: Record<string, UserReserveData> = devCoins.reduce((accu, coin) => {
      const userReserve: UserReserveData = {
        underlyingBalance: '0',
        variableBorrows: '0',
        reserve: reserves[coin.type]
      }
      return {...accu, [coin.type]: userReserve }
    }, {} as Record<string, UserReserveData>)
    
    if (userAssets) {
      const userSupplies = userAssets.collateral;
      const userBorrows = userAssets.debt;
      // used for contract to idenfity user data
      const userAssetsId = userAssets.assetNftId;
  
      let userBorrowedUSD = 0, userBorrowInterestUSD = 0, userSuppliedUSD = 0, userSuppliedInterestUSD = 0;
      userSupplies.forEach(supplied => {
        const userReserve = userReserves[supplied.tokenType];
        if (userReserve) {
          const decimal = userReserve.reserve.decimals;
          userReserve.underlyingBalance = ((supplied.tokenAmount + supplied.interest) / 10 ** decimal).toString();
          userSuppliedUSD += Number(supplied.tokenAmount) * Number(userReserve.reserve.priceInUSD);
          userSuppliedInterestUSD += Number(supplied.interest) * Number(userReserve.reserve.priceInUSD);
        }
      })
      userBorrows.forEach(borrowed => {
        const userReserve = userReserves[borrowed.tokenType];
        if (userReserve) {
          const decimal = userReserve.reserve.decimals;
          userReserve.variableBorrows = ((borrowed.tokenAmount + borrowed.interest) / 10 ** decimal).toString();
          userBorrowedUSD += Number(borrowed.tokenAmount) * Number(userReserve.reserve.priceInUSD);
          userBorrowInterestUSD += Number(borrowed.interest) * Number(userReserve.reserve.priceInUSD);
        }
      })
      
      const netWorthUSD = userSuppliedUSD + userSuppliedInterestUSD - userBorrowedUSD - userBorrowInterestUSD;
      const healthFactor = (userSuppliedUSD + userSuppliedInterestUSD) / (userBorrowInterestUSD + userBorrowedUSD);
      const currentLoanToValue = (userBorrowedUSD + userBorrowInterestUSD).toString();
      const currentLiquidationThreshold = (userSuppliedUSD + userSuppliedInterestUSD) * LIQUIDATION_FACTOR;
      const loanToValue = currentLoanToValue;
      const claimableRewardsUsd = 0;
      /// TODO: calculate real APY
      const netApy = 0;
      get().setUserAssetsOverview({
        netApy, netWorthUSD, healthFactor: healthFactor.toString(),
        currentLiquidationThreshold: currentLiquidationThreshold.toString(),
        loanToValue, claimableRewardsUsd,
        currentLoanToValue: currentLoanToValue.toString(),
      })
      
      const convertRecordToValueArr = <T>(r: Record<string, T>): T[] => {
        let res: T[] = [];
        for(const key in r) {
          res.push(r[key])
        }
        return res;
      }
      get().setReserves(convertRecordToValueArr(reserves));
      get().setUserReserves(convertRecordToValueArr(userReserves));
    }
  }
  return { refreshAppData }
}
