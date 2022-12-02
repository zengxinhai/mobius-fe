import { AptosClient } from 'aptos';
import { entryFunSimulate, EntryFuncParams } from './entry_fun_txn';
import { Result } from '../types';


type WriteResourceChange<T> = {
  address: string
  state_key_hash: string
  data: {
    type: string
    data: T
  },
  type: 'write_resource'
}

// 这里通过提交模拟交易到Aptos，得到链上的计算结果。
// 链上把计算结果包在一个struct里，从交易结果解析这struct就是计算结果
export const queryFromSimulation = async <StructType>(
  params: EntryFuncParams,
  structName: string,
  client: AptosClient): Promise<Result<StructType>> => {
  const response = await entryFunSimulate(params, client);
  if (!response || response.length === 0) return { ok: false, data: null, error: 'Network error' }
  const txnRes = response[0];
  const changeSets = txnRes.changes;
  const resourceType = `${params.moduleName}::${structName}`;
  const typeChanges
    = changeSets.filter(change => (change as any)?.data?.type == resourceType);
  if (typeChanges.length === 0) return { ok: false, data: null, error: 'Query type error' }
  const change = typeChanges[0] as WriteResourceChange<StructType>;
  return { ok: true, data: change.data.data, error: '' }
}
