import {useRootStore} from "../../../store/root";
import BigNumber from "bignumber.js";
import {ReserveData} from "../../../mobius-contract/types";

export const useMaxborrowableAmount = (reserve: ReserveData) => {
  const bigNumber = BigNumber.clone({ DECIMAL_PLACES: reserve.decimals, ROUNDING_MODE: BigNumber.ROUND_DOWN })
  const borrowPowerUSD = useRootStore(state => state.userAssetsOverview.borrowPowerUSD);
  const borrowPower = bigNumber(borrowPowerUSD).isPositive()
    ? bigNumber(borrowPowerUSD).div(reserve.priceInUSD).div(1.01)
    : bigNumber(0)
  
  return bigNumber.min(borrowPower, reserve.availableBorrows).toString()
}
