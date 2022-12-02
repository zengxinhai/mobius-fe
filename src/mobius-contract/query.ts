import { aptox } from './aptox';
import { EntryFuncArgs } from '../../packages/aptox';
import { StandardAssetsNftGalleryType, queryModule, StandardPositionType } from './resource-types';
import { RateList, AssetsOverview, BorrowableAmountsList, ToUsdPriceList, AssetNftGallery } from './struct-types';

export const getUserAssets = (address: string) => {
  return aptox.getResource<AssetNftGallery>(StandardAssetsNftGalleryType, address)
}

export const getCurrentRateList = () => {
  return aptox.queryFromEntryFunSimulation<RateList>({
    moduleName: queryModule,
    func: 'get_current_rate_list',
    tyArgs: [StandardPositionType],
  }, 'CurrentRateList')
}

export const getCurrentBorrowableAmountsList = (address: string) => {
  return aptox.queryFromEntryFunSimulation<BorrowableAmountsList>({
    moduleName: queryModule,
    func: 'get_current_borrowable_amounts_list',
    tyArgs: [StandardPositionType],
    args: [EntryFuncArgs.fromHexString(address)],
  }, 'CurrentBorrowableAmountsList')
}

export const getCurrentAssetsOverview = () => {
  return aptox.queryFromEntryFunSimulation<AssetsOverview>({
    moduleName: queryModule,
    func: 'get_current_assets_overview',
    tyArgs: [StandardPositionType],
  }, 'CurrentAssetsOverview')
}

export const getCurrentToUsdPriceList = () => {
  return aptox.queryFromEntryFunSimulation<ToUsdPriceList>({
    moduleName: queryModule,
    func: 'get_current_to_usd_price_list',
  }, 'CurrentToUsdPriceList')
}
