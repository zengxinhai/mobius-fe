import {useCallback} from "react";
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import {EntryFuncParams, useSimulateTxn} from 'src/aptos/chain/simulate-txn';
import { Result } from 'src/models/result';
import { useNetwork } from './network';


export const useContractQuery = <T>() => {
  const network = useNetwork();
  const { connected } = useWallet();
  const simulateTxn = useSimulateTxn<T>(network.nodeUrl);
  return useCallback(async (params: EntryFuncParams, typeName: string): Promise<Result<T>> => {
    if (!connected) return { ok: false, data: null, error: 'Not connected' }
    return simulateTxn(params, typeName);
  }, [connected, simulateTxn])
}

export type TestData = {
  val: number
}
export const useTestQuery = () => {
  const contractQuery = useContractQuery<TestData>();
  return useCallback(() => {
    return contractQuery({
      moduleName: '0x3d4f2d8c266f568aa7721dd01e4cd7366fcc7b632aa2d5eeef9fbbc62f4e3661::test',
      func: 'get_data',
      tyArgs: [],
      args: []
    }, 'Data')
  }, [contractQuery])
}
