import {useRootStore} from "../../../store/root";
import BigNumber from "bignumber.js";
import {UserReserveData} from "../../../store/types";

export const useMaxWithdrawAmount = (userReserve: UserReserveData) => {
  const bigNumber = BigNumber.clone({ DECIMAL_PLACES: userReserve.reserve.decimals, ROUNDING_MODE: BigNumber.ROUND_DOWN })
  const userAssetOverview = useRootStore(state => state.userAssetsOverview);
  return bigNumber.min(
    bigNumber(userAssetOverview.borrowPowerUSD).div(userReserve.reserve.priceInUSD),
    bigNumber(userReserve.underlyingBalance),
    bigNumber(userReserve.reserve.availableBorrows)
  ).toString()
}
