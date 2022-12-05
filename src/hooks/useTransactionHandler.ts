import { useWallet } from '@manahippo/aptos-wallet-adapter'
import {useCallback} from "react";
import {useRootStore} from "../store/root";
import {AptosClient} from "aptos";

type TxnPayload = {
  type: string
  function: string
  type_arguments: string[]
  arguments: any[]
};
export const useSubmitAndWaitTxn = () => {
  const { signAndSubmitTransaction } = useWallet();
  const nodeUrl = useRootStore(state => state.nodeUrl);
  return useCallback(async (payload: TxnPayload) => {
    const txn = await signAndSubmitTransaction(payload)
    const client = new AptosClient(nodeUrl);
    await client.waitForTransaction(txn.hash);
    return txn;
  }, [signAndSubmitTransaction, nodeUrl])
}
