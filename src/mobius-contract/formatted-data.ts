import { getAllData } from "./aggr";
import {devCoins} from './coin-config';
import { LIQUIDATION_FACTOR } from './config';
import {ReserveData, emptyReserve, UserReserveData, WalletBalance} from "./types";
import { AllData } from './aggr'
import BigNumber from "bignumber.js";
import {convertRecordToValueArr} from "./util";

const formatWalletBalances = ({ coinBalances, priceList }: AllData) => {
  const walletBalances: Record<string, WalletBalance> = devCoins.reduce((accu, coin) => {
    const coinAmount =  coinBalances[coin.type]
      ? BigNumber(coinBalances[coin.type]).shiftedBy(-coin.decimal).toString()
      : '0'
    const balance: WalletBalance = {
      amount: coinAmount,
      amountUSD: '',
    }
    return {...accu, [coin.type]: balance}
  }, {} as Record<string, WalletBalance>)
  priceList && priceList.forEach(price => {
    const walletBalance = walletBalances[price.tokenType];
    if (walletBalance) {
      walletBalance.amountUSD = BigNumber(walletBalance.amount).multipliedBy(price.tokenPriceUSD).toString();
    }
  })
  return walletBalances;
}

const formatAssetOverview = ({ assetsOverview }: AllData) => {
  if (!assetsOverview) return undefined;
  return {
    totalMarketSizeUSD: assetsOverview.totalSuppliedUSD.toString(),
    totalBorrowsUSD: assetsOverview.totalBorrowedUSD.toString(),
    totalAvailableUSD: BigNumber(assetsOverview.totalSuppliedUSD).minus(assetsOverview.totalBorrowedUSD).toString()
  }
}

const formatReserves = ({ rateList, borrowableAmounts, priceList }: AllData) => {
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
  
  borrowableAmounts && borrowableAmounts.forEach(amountInfo => {
    const reserve = reserves[amountInfo.tokenType];
    if (reserve) {
      reserve.availableBorrows = BigNumber(amountInfo.borrowableAmount).shiftedBy(-reserve.decimals).toString();
      reserve.totalBorrows = BigNumber(amountInfo.borrowedAmount).shiftedBy(-reserve.decimals).toString();
      reserve.totalDebt = BigNumber(amountInfo.borrowableAmount).shiftedBy(-reserve.decimals).toString();
      reserve.borrowUsageRatio = BigNumber(amountInfo.borrowedAmount)
        .div(BigNumber(amountInfo.borrowableAmount).plus(amountInfo.borrowedAmount)).toString();
      reserve.unborrowedLiquidity = BigNumber(amountInfo.borrowableAmount).shiftedBy(-reserve.decimals).toString();
      reserve.totalLiquidity = BigNumber(amountInfo.borrowableAmount).shiftedBy(-reserve.decimals).toString();
    }
  })
  
  priceList && priceList.forEach(price => {
    const reserve = reserves[price.tokenType];
    if (reserve) {
      reserve.priceInUSD = price.tokenPriceUSD.toString();
      reserve.availableBorrowsInUSD = BigNumber(reserve.availableBorrows).multipliedBy(reserve.priceInUSD).toString();
      reserve.totalDebtUSD = (BigNumber(reserve.totalDebt).multipliedBy(reserve.priceInUSD)).toString();
      reserve.totalLiquidityUSD = (BigNumber(reserve.totalLiquidity).multipliedBy(reserve.priceInUSD)).toString();
    }
  })
  return reserves;
}

const formatUserReserves = ({ borrowableAmounts, userAssets }: AllData, reserves: Record<string, ReserveData>) => {
  const userReserves: Record<string, UserReserveData> = devCoins.reduce((accu, coin) => {
    const userReserve: UserReserveData = {
      underlyingBalance: '0',
      variableBorrows: '0',
      borrowableAmount: '0',
      reserve: reserves[coin.type]
    }
    return {...accu, [coin.type]: userReserve }
  }, {} as Record<string, UserReserveData>)
  
  borrowableAmounts && borrowableAmounts.forEach(amountInfo => {
    const userReserve = userReserves[amountInfo.tokenType];
    if (userReserve) {
      userReserve.borrowableAmount = BigNumber(amountInfo.userBorrowableAmount).shiftedBy(-userReserve.reserve.decimals).toString();
    }
  })
  
  if (userAssets) {
    const userSupplies = userAssets.collateral;
    const userBorrows = userAssets.debt;
  
    userSupplies.forEach(supplied => {
      const userReserve = userReserves[supplied.tokenType];
      if (userReserve) {
        const decimal = userReserve.reserve.decimals;
        userReserve.underlyingBalance = BigNumber(supplied.tokenAmount).plus(supplied.interest).shiftedBy(-decimal).toString();
      }
    })
    userBorrows.forEach(borrowed => {
      const userReserve = userReserves[borrowed.tokenType];
      if (userReserve) {
        const decimal = userReserve.reserve.decimals;
        userReserve.variableBorrows = BigNumber(borrowed.tokenAmount).plus(borrowed.interest).shiftedBy(-decimal).toString();
      }
    })
  }
  return userReserves;
}

const formatUserAssetOverview = ({ userAssets }: AllData, reserves: Record<string, ReserveData>) => {
  if (!userAssets) return undefined;
  
  const userSupplies = userAssets.collateral;
  const userBorrows = userAssets.debt;
  // used for contract to idenfity user data
  const userAssetsId = userAssets.assetNftId;

  let earnedAPYNumerator = BigNumber(0), debtAPYNumerator = BigNumber(0);
  let totalCollateralUSD = BigNumber(0), totalDebtUSD = BigNumber(0);
  userSupplies.forEach(supplied => {
    const reserve = reserves[supplied.tokenType];
    if (reserve) {
      const decimal = reserve.decimals;
      let userSuppliedUSD =
        BigNumber(supplied.tokenAmount).shiftedBy(-decimal).multipliedBy(reserve.priceInUSD)
      let userSuppliedInterestUSD =
        BigNumber(supplied.interest).shiftedBy(-decimal).multipliedBy(reserve.priceInUSD)
      
      totalCollateralUSD = totalCollateralUSD.plus(userSuppliedUSD).plus(userSuppliedInterestUSD)
      
      earnedAPYNumerator = earnedAPYNumerator.plus(
        userSuppliedUSD.multipliedBy(reserve.supplyAPY)
      )
    }
  })
  userBorrows.forEach(borrowed => {
    const reserve = reserves[borrowed.tokenType];
    if (reserve) {
      const decimal = reserve.decimals;
      let userBorrowedUSD
        = BigNumber(borrowed.tokenAmount).shiftedBy(-decimal).multipliedBy(reserve.priceInUSD)
      let userBorrowInterestUSD
        = BigNumber(borrowed.interest).shiftedBy(-decimal).multipliedBy(reserve.priceInUSD)
      
      totalDebtUSD = totalDebtUSD.plus(userBorrowedUSD).plus(userBorrowInterestUSD)
      
      debtAPYNumerator = debtAPYNumerator.plus(
        userBorrowedUSD.multipliedBy(reserve.variableBorrowAPY)
      )
    }
  })
  const netWorthUSD = totalCollateralUSD.minus(totalDebtUSD);
  const healthFactor = totalCollateralUSD.multipliedBy(LIQUIDATION_FACTOR).div(totalDebtUSD);
  const currentLiquidationThreshold = totalCollateralUSD.multipliedBy(LIQUIDATION_FACTOR);
  const currentLoanToValue = totalDebtUSD;
  const loanToValue = currentLoanToValue;
  
  const earnedAPYDenominator = totalCollateralUSD;
  const debtAPYDenominator = totalDebtUSD;
  
  const earnedAPY = earnedAPYNumerator.div(earnedAPYDenominator);
  const debtAPY = debtAPYNumerator.div(debtAPYDenominator);
  const netAPY = earnedAPYNumerator.minus(debtAPYNumerator).div(earnedAPYDenominator);

  const totalLiquidityUSD = totalCollateralUSD.minus(totalDebtUSD);

  return {
    userAssetsId,
    netAPY: netAPY.toString(),
    earnedAPY: earnedAPY.toString(),
    debtAPY: debtAPY.toString(),
    netWorthUSD: netWorthUSD.toString(),
    totalLiquidityUSD: totalLiquidityUSD.toString(),
    totalCollateralUSD: totalCollateralUSD.toString(),
    totalBorrowsUSD: totalDebtUSD.toString(),
    claimableRewardsUSD: '0', // We don't have token incentives for now
    healthFactor: healthFactor.toString(),
    currentLiquidationThreshold: currentLiquidationThreshold.toString(),
    loanToValue: loanToValue.toString(),
    currentLoanToValue: currentLoanToValue.toString(),
  }
}

export const getAppData = async (account: string) => {
  const allData = await getAllData(account);
  
  const walletBalances = formatWalletBalances(allData);
  
  const assetOverview = formatAssetOverview(allData);
  
  const reserves = formatReserves(allData);
  
  const userReserves = formatUserReserves(allData, reserves);
  
  const userAssetOverview = formatUserAssetOverview(allData, reserves);
  
  return {
    walletBalances,
    assetOverview,
    reserves: convertRecordToValueArr(reserves),
    userReserves: convertRecordToValueArr(userReserves),
    userAssetOverview
  }
}
