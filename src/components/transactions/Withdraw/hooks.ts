import {useRootStore} from "../../../store/root";
import BigNumber from "bignumber.js";

const useMaxWithdrawAmount = (price: string, underlyingBalance: string, decimal: number) => {
  const bigNumber = BigNumber.clone({ DECIMAL_PLACES: decimal, ROUNDING_MODE: BigNumber.ROUND_DOWN })
  const userAssetOverview = useRootStore(state => state.userAssetsOverview);
  return bigNumber.min(
    bigNumber(userAssetOverview.borrowPowerUSD).div(price),
    bigNumber(underlyingBalance)
  ).toString()
}
