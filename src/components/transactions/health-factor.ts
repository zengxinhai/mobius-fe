import {useRootStore} from "../../store/root";
import BigNumber from "bignumber.js";
import {LIQUIDATION_FACTOR} from "../../mobius-contract/config";

const useCalculatedHealthFactor = (amount: string, price: string, isAddingCollateral: boolean) => {
  const userAssetOverview = useRootStore(state => state.userAssetsOverview);
  const amountUSD = BigNumber(amount).multipliedBy(price);
  const newCollateralUSD = isAddingCollateral
    ? BigNumber(userAssetOverview.totalCollateralUSD).plus(amountUSD)
    : BigNumber(userAssetOverview.totalCollateralUSD)
  const newDebtUSD = isAddingCollateral
    ? BigNumber(userAssetOverview.totalBorrowsUSD)
    : BigNumber(userAssetOverview.totalBorrowsUSD).plus(amountUSD)
  
  BigNumber.config({ DECIMAL_PLACES: 2 })
  const newHF = newCollateralUSD.div(newDebtUSD).multipliedBy(LIQUIDATION_FACTOR).toString()
  BigNumber.config({ DECIMAL_PLACES: 8 })
  return newHF;
}

export const useHealthFactorAfterRepay = (amount: string, price: string) => {
  return useCalculatedHealthFactor(amount, price, true)
}
export const useHealthFactorAfterBorrow = (amount: string, price: string) => {
  return useCalculatedHealthFactor(amount, price, false)
}
export const useHealthFactorAfterWithdraw = (amount: string, price: string) => {
  return useCalculatedHealthFactor(amount, price, false)
}
export const useHealthFactorAfterSupply = (amount: string, price: string) => {
  return useCalculatedHealthFactor(amount, price, true)
}
