import {useRootStore} from "../../../store/root";
import BigNumber from "bignumber.js";

export const useMaxborrowableAmount = (price: string, decimal: number) => {
  const bigNumber = BigNumber.clone({ DECIMAL_PLACES: decimal, ROUNDING_MODE: BigNumber.ROUND_DOWN })
  const borrowPowerUSD = useRootStore(state => state.userAssetsOverview.borrowPowerUSD);
  return bigNumber(borrowPowerUSD).isPositive()
    ? bigNumber(borrowPowerUSD).div(price).div(1.01).toString()
    : '0'
}
