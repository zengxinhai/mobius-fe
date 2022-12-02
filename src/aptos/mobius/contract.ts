import { queryFromSimulation, EntryFuncParams } from './simulate-txn'
import {AptosClient } from 'aptos'
import { DEV_NET } from '../config'
import { Result } from '../../models/result'
import { convertRateCard } from './utils/contractStructConverter'
import { RateCard } from './contract-types'
import { StandardPositionType, treasuryModule } from '../config/resource-types';


const currentRateListParams: EntryFuncParams = {
  moduleName: treasuryModule,
  func: 'get_current_rate_list',
  tyArgs: [StandardPositionType],
  args: []
};

type BorrowSupplyRate = {
  tokenType: string
  supplyRate: number
  borrowRate: number
}
export const getBorrowSupplyRates = async(): Promise<Result<BorrowSupplyRate[]>> => {
  const aptosClient = new AptosClient(DEV_NET.nodeUrl);
  const res = await queryFromSimulation<{data: RateCard[]}>(aptosClient, currentRateListParams, 'CurrentRateList');
  if (res.ok) {
    const data = res.data.data.map(item => convertRateCard(item))
    return { ok: true, data, error: ''  }
  } else {
    return { ok: false, data: null, error: 'Query rates failed'  }
  }
}
