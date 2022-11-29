import { queryFromSimulation, EntryFuncParams } from './simulate-txn'
import {AptosClient } from 'aptos'
import { DEV_NET } from '../config'
import { Result } from '../../models/result'
import { convertRateCard } from './utils/contractStructConverter'
import { RateCard } from './contract-types'

const deployAddr = '0x3d4f2d8c266f568aa7721dd01e4cd7366fcc7b632aa2d5eeef9fbbc62f4e3661'
const marketScriptModule = `${deployAddr}::market_script`
const treasuryModule = `${deployAddr}::treasury`
const positionType = `${deployAddr}::management::StandardPosition`

const currentRateListParams: EntryFuncParams = {
  moduleName: treasuryModule,
  func: 'get_current_rate_list',
  tyArgs: [positionType],
  args: []
};

type BorrowSupplyRate = {
  tokenType: string
  supplyRate: number
  borrowRate: number
}
export const getBorrowSupplyRates = async(): Promise<Result> => {
  const aptosClient = new AptosClient(DEV_NET.nodeUrl);
  const res = await queryFromSimulation<{data: RateCard[]}>(aptosClient, currentRateListParams, 'CurrentRateList');
  if (res.ok) {
    const data = res.data.data.map(item => convertRateCard(item))
    return { ok: true, data, error: ''  }
  } else {
    return { ok: false, data: null, error: 'Query rates failed'  }
  }
}