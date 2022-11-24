import { StateCreator } from 'zustand'
import { RootState } from './root'
import { simulateTransaction } from 'src/aptos/chain/simulate-txn'
import {AptosClient} from "aptos";

export interface TestSlice {
  val?: number,
  getVal: () => void,
}

type WriteResourceChange<T> = {
  address: string
  state_key_hash: string
  data: {
    type: string
    data: T
  },
  type: 'write_resource'
}
export const createTestSlice: StateCreator<
  RootState,
  [['zustand/devtools', never]],
  [],
  TestSlice
  > = (set, get) => {
  const getClient = () => {
    const nodeUrl = get().nodeUrl;
    return new AptosClient(nodeUrl);
  }
  return {
    val: undefined,
    getVal: async () => {
      const params = {
        moduleName: '0x3d4f2d8c266f568aa7721dd01e4cd7366fcc7b632aa2d5eeef9fbbc62f4e3661::test',
        func: 'get_data',
        tyArgs: [],
        args: []
      }
      const structName = 'Data';
      type StructType = { val: number };
      
      const client = getClient();
      const response = await simulateTransaction(params, client);
      if (!response || response.length === 0) return
      const txnRes = response[0];
      const changeSets = txnRes.changes;
      const resourceType = `${params.moduleName}::${structName}`;
      const typeChanges
        = changeSets.filter(change => (change as any)?.data?.type == resourceType);
      if (typeChanges.length === 0) return { ok: false, data: null, error: 'Query type error' }
      const change = typeChanges[0] as WriteResourceChange<StructType>;
      set({ val: change.data.data.val })
    }
  }
}
