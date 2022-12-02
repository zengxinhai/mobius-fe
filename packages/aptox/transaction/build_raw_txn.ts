import {
  AptosClient,
  TxnBuilderTypes,
  HexString,
  TypeTagParser
} from "aptos";

const {
  AccountAddress,
  EntryFunction,
  TransactionPayloadEntryFunction,
  RawTransaction,
  ChainId,
} = TxnBuilderTypes;

const formatTyArg = (arg: string) => new TypeTagParser(arg).parseTypeTag();

export type EntryFuncParams = {
  moduleName: string
  func: string
  tyArgs?: string[]
  args?: Uint8Array[]
}
/// TODO: add support for customize gas and gas price
export const buildEntryFuncTxn = async (
  funParams: EntryFuncParams,
  client: AptosClient,
  senderAddr: string | HexString,
) => {
  const ty_args = funParams.tyArgs ? funParams.tyArgs.map(arg => formatTyArg(arg)) : [];
  const entryFunctionPayload = new TransactionPayloadEntryFunction(
    EntryFunction.natural(funParams.moduleName, funParams.func, ty_args, funParams.args || [])
  );
  const [{ sequence_number: sequenceNumber }, chainId] = await Promise.all([
    client.getAccount(senderAddr),
    client.getChainId(),
  ]);
  return new RawTransaction(
    // Transaction sender account address
    AccountAddress.fromHex(senderAddr),
    // Transaction sequence number
    BigInt(sequenceNumber),
    // Payload
    entryFunctionPayload,
    // Max gas unit to spend
    BigInt(20000),
    // Gas price per unit
    BigInt(100),
    // Expiration timestamp. Transaction is discarded if it is not executed within 10 seconds from now.
    BigInt(Math.floor(Date.now() / 1000) + 10),
    new ChainId(chainId),
  );
}
