import {
  AssetNftGallery,
  UserAsset,
  TypeInfo,
  AssetsOverview,
  RateList,
  Exp,
  ToUSDPriceList,
  BorrowableAmountsList,
} from './struct-types'
import { EXP_SCALE } from './config'


function hexToAscii(_hex: string): string {
  const hex = _hex.startsWith('0x') ? _hex.slice(2) : _hex;
  let str = '';
  for (let n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}

const parseTypeInfo = (typeInfo: TypeInfo) => {
  const moduleName = hexToAscii(typeInfo.module_name);
  const structName = hexToAscii(typeInfo.struct_name);
  return `${typeInfo.account_address}::${moduleName}::${structName}`;
}

const parseExp = (exp: Exp) =>  exp.mantissa / EXP_SCALE;

const parseUserAsset = (userAsset: UserAsset) => {
  const interest = userAsset.interest;
  const tokenAmount = userAsset.token_amount;
  const tokenType = parseTypeInfo(userAsset.token_code);
  return { interest, tokenAmount, tokenType }
}

export const convertAssetNftGallery = (assetNftGallery: AssetNftGallery) => {
  const nfts = assetNftGallery.items.vec[0];
  if (nfts.length === 0) throw Error('Contract user asset format error');
  const nft = nfts[0];
  const assetNftId = nft.id;
  const collateral = nft.body.assets.collateral.map(item => parseUserAsset(item))
  const debt = nft.body.assets.debt.map(item => parseUserAsset(item))
  return { assetNftId, collateral, debt }
}

export const convertAssetsOverview = (assetsOverview: AssetsOverview) => {
  const totalBorrowedUSD = parseExp(assetsOverview.borrowed_value);
  const totalSuppliedUSD = parseExp(assetsOverview.supplied_value);
  return { totalSuppliedUSD, totalBorrowedUSD }
}

export const convertRateList = (rateList: RateList) => {
  return rateList.data.map(rate => {
    return {
      borrowAPY: parseExp(rate.borrow_rate),
      supplyAPY: parseExp(rate.supply_rate),
      tokenType: parseTypeInfo(rate.token_code)
    }
  })
}

export const convertToUSDPriceList = (toUSDPriceList: ToUSDPriceList) => {
  return toUSDPriceList.items.map(price => {
    return {
      tokenType: parseTypeInfo(price.token_code),
      tokenAmount: price.amount,
      tokenPriceUSD: parseExp(price.value),
    }
  })
}

export const convertBorrowableAmountsList = (borrowableAmountsList: BorrowableAmountsList) => {
  return borrowableAmountsList.items.map(item => {
    return {
      tokenType: parseTypeInfo(item.token_code),
      borrowableAmount: item.total_borrowable_amount,
      borrowedAmount: item.total_borrowed_amount,
      userBorrowableAmount: item.account_borrowable_amount
    }
  })
}
