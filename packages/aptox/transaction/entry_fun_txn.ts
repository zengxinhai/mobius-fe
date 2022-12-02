import {
  AptosAccount,
  AptosClient,
  TxnBuilderTypes,
  HexString,
} from "aptos";

import { buildEntryFuncTxn, EntryFuncParams } from './build_raw_txn';

export type { EntryFuncParams } from './build_raw_txn';

export async function entryFunCall(params: EntryFuncParams, client: AptosClient, sender: AptosAccount) {
  const rawTxn = await buildEntryFuncTxn(params, client, sender.address());
  const signed = await client.signTransaction(sender, rawTxn);
  return client.submitTransaction(signed)
}

export const SIM_KEYS = {
  pubkey: new HexString('0x2c367115936595fc5791a013dd84fcf73e2cc31697ca704f4ce76039a1062f5d'),
  address: new HexString('0x3d4f2d8c266f568aa7721dd01e4cd7366fcc7b632aa2d5eeef9fbbc62f4e3661'),
}
export async function entryFunSimulate(
  params: EntryFuncParams,
  client: AptosClient,
  sender?: AptosAccount) {
  // Use pre defined sender for simulation if no sender is provided
  let simulateSender = sender || new TxnBuilderTypes.Ed25519PublicKey(SIM_KEYS.pubkey.toUint8Array());
  let senderAddr = sender ? sender.address() : SIM_KEYS.address;
  
  const rawTxn = await buildEntryFuncTxn(params, client, senderAddr);
  return client.simulateTransaction(simulateSender, rawTxn)
}
