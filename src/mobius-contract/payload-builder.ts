import { marketScriptModule, faucetModule } from './resource-types'
import { decimals } from './coin-config'
import BigNumber from "bignumber.js";

const buildEntryFuncPayload = (params: {
                                 moduleName: string
                                 func: string
                                 tyArgs: string[]
                                 args: any[]
                               }) => {
  return {
    type: "entry_function_payload",
    function: `${params.moduleName}::${params.func}`,
    type_arguments: params.tyArgs,
    arguments: params.args,
  };
}

export const buildInitAssetPayload = (coinType: string, amount: number) => {
  const decimal = decimals[coinType] || 0;
  const realAmount = BigNumber(amount).shiftedBy(decimal);
  return buildEntryFuncPayload({
    moduleName: marketScriptModule,
    func: 'init_assets',
    tyArgs: [coinType],
    args: [realAmount.integerValue().toNumber()]
  })
}

export const buildBorrowPayload = (coinType: string, amount: number, assetId: string) => {
  const decimal = decimals[coinType] || 0;
  const realAmount = BigNumber(amount).shiftedBy(decimal);
  return buildEntryFuncPayload({
    moduleName: marketScriptModule,
    func: 'borrow',
    tyArgs: [coinType],
    args: [assetId, realAmount.integerValue().toNumber()]
  })
}

export const buildRepayPayload = (coinType: string, amount: number, assetId: string) => {
  const decimal = decimals[coinType] || 0;
  const realAmount = BigNumber(amount).shiftedBy(decimal);
  return buildEntryFuncPayload({
    moduleName: marketScriptModule,
    func: 'repay',
    tyArgs: [coinType],
    args: [assetId, realAmount.integerValue().toNumber()]
  })

}

export const buildSupplyPayload = (coinType: string, amount: number, assetId: string) => {
  const decimal = decimals[coinType] || 0;
  const realAmount = BigNumber(amount).shiftedBy(decimal);
  return buildEntryFuncPayload({
    moduleName: marketScriptModule,
    func: 'deposit',
    tyArgs: [coinType],
    args: [assetId, realAmount.integerValue().toNumber()]
  })
}

export const buildWithdrawPayload = (coinType: string, amount: number, assetId: string) => {
  const decimal = decimals[coinType] || 0;
  const realAmount = BigNumber(amount).shiftedBy(decimal);
  return buildEntryFuncPayload({
    moduleName: marketScriptModule,
    func: 'withdraw',
    tyArgs: [coinType],
    args: [assetId, realAmount.integerValue().toNumber()]
  })
}

export const buildFaucetPayload = (coinType: string, amount: number) => {
  const decimal = decimals[coinType] || 0;
  const realAmount = BigNumber(amount).shiftedBy(decimal);
  return buildEntryFuncPayload({
    moduleName: faucetModule,
    func: 'drip',
    tyArgs: [coinType],
    args: [realAmount.integerValue().toNumber()]
  })
}
