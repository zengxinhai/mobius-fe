export type Exp = {
  mantissa: number
}

export type TypeInfo = {
  account_address: string,
  module_name: string,
  struct_name: string,
}

export type RateCard = {
  token_code: TypeInfo
  borrow_rate: Exp
  supply_rate: Exp
}

export type RateList = {
  data: RateCard[]
}

export type AssetsOverview = {
  borrowed_value: Exp,
  supplied_value: Exp,
}

type BorrowableAmounts = {
  account_borrowable_amount: number,
  token_code: TypeInfo,
  total_borrowable_amount: number,
  total_borrowed_amount: number,
}
export type BorrowableAmountsList = {
  items: BorrowableAmounts[]
}


export type ToUSDPrice = {
  token_code: TypeInfo,
  amount: number,
  value: Exp
}

export type ToUSDPriceList = {
  items: ToUSDPrice[]
}

// for nft asset
type AssetNftMeta = {
  description: string
  image: string
  image_data: string
  name: string
}

export type UserAsset = {
  interest: number,
  rate: {
    "vec": [
      {
        "index": Exp
        "last_update_time": number
      }
    ]
  },
  token_amount: number,
  token_code: TypeInfo
}

type AssetNftBody = {
  assets: {
    collateral: UserAsset[]
    debt: UserAsset[]
    last_borrow_index: number
    last_supply_index: number
    last_update_at: number
  }
}

type AssetNft = {
  base_meta: AssetNftMeta
  body: AssetNftBody
  creator: string
  id: number
  type_meta: {
    create_at: number
  }
}

export type AssetNftGallery = {
  items: {
    vec: [AssetNft[]]
  }
}




