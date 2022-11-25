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
