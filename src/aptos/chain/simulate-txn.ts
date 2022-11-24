import { useCallback } from 'react';
import {
  AptosClient,
  TxnBuilderTypes,
  BCS, HexString,
} from "aptos";

import { useAptos } from "./client";
import { Result } from "src/models/result";

const {
  AccountAddress,
  TypeTagStruct,
  EntryFunction,
  StructTag,
  TransactionPayloadEntryFunction,
  RawTransaction,
  ChainId,
  Ed25519PublicKey
} = TxnBuilderTypes;

const formatTyArg = (arg: string) => new TypeTagStruct(StructTag.fromString(arg));
const formatArg = (arg: string) => BCS.bcsSerializeStr(arg);

export const buildEntryFuncTxn = (
  moduleName: string,
  func: string,
  _tyArgs: string[],
  _args: string[],
  address: string | HexString,
  sequenceNumber: number,
  gas: number = 200,
  gasPrice: number = 100,
  chainId: number = 1,
) => {
  const ty_args = _tyArgs.map(arg => formatTyArg(arg));
  const args = _args.map(arg => formatArg(arg));
  const entryFunctionPayload = new TransactionPayloadEntryFunction(
    EntryFunction.natural(moduleName, func, ty_args, args)
  );
  return new RawTransaction(
    // Transaction sender account address
    AccountAddress.fromHex(address),
    // Transaction sequence number
    BigInt(sequenceNumber),
    // Payload
    entryFunctionPayload,
    // Max gas unit to spend
    BigInt(2000),
    // Gas price per unit
    BigInt(100),
    // Expiration timestamp. Transaction is discarded if it is not executed within 10 seconds from now.
    BigInt(Math.floor(Date.now() / 1000) + 10),
    new ChainId(chainId),
  );
}

export type EntryFuncParams = {
  moduleName: string
  func: string
  tyArgs?: string[]
  args?: string[]
}

export const SIM_KEYS = {
  pubkey: new HexString('0x2c367115936595fc5791a013dd84fcf73e2cc31697ca704f4ce76039a1062f5d'),
  address: new HexString('0x3d4f2d8c266f568aa7721dd01e4cd7366fcc7b632aa2d5eeef9fbbc62f4e3661'),
}
export async function simulateTransaction(params: EntryFuncParams, client: AptosClient) {
  const chainId = 38;
  const sequenceNumber = 2;
  const pubKey = new Ed25519PublicKey(SIM_KEYS.pubkey.toUint8Array());
  const address = SIM_KEYS.address;
  
  const rawTxn = buildEntryFuncTxn(
    params.moduleName,
    params.func,
    params.tyArgs || [],
    params.args || [],
    address,
    sequenceNumber,
    // gas
    200,
    // gasPrice
    100,
    chainId
  );
  return client.simulateTransaction(pubKey, rawTxn)
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
export const useSimulateTxn = <StructType>(nodeUrl: string) => {
  const client = useAptos(nodeUrl);
  return useCallback(async (entryFunParams: EntryFuncParams, structName: string): Promise<Result<StructType>> => {
    if (!client) return { ok: false, data: null, error: 'Wallet not connected' }
    const response = await simulateTransaction(entryFunParams, client);
    if (!response || response.length === 0) return { ok: false, data: null, error: 'Network error' }
    const txnRes = response[0];
    const changeSets = txnRes.changes;
    const resourceType = `${entryFunParams.moduleName}::${structName}`;
    const typeChanges
      = changeSets.filter(change => (change as any)?.data?.type == resourceType);
    if (typeChanges.length === 0) return { ok: false, data: null, error: 'Query type error' }
    const change = typeChanges[0] as WriteResourceChange<StructType>;
    return { ok: true, data: change.data.data, error: '' }
  }, [client]);
}
