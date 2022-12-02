import {
  AptosAccount,
  AptosClient,
  TxnBuilderTypes,
} from "aptos";

export type ScriptCtx = {
  bytecode: Uint8Array,
  tyArgs: TxnBuilderTypes.TypeTag[],
  args: TxnBuilderTypes.TransactionArgument[]
}

export async function submitScriptTransaction(codeCtx: ScriptCtx, sender: AptosAccount, client: AptosClient) {
  const script = new TxnBuilderTypes.Script(codeCtx.bytecode, codeCtx.tyArgs, codeCtx.args);
  const scriptFunctionPayload = new TxnBuilderTypes.TransactionPayloadScript(script);
  const [{ sequence_number: sequenceNumber }, chainId] = await Promise.all([
    client.getAccount(sender.address()),
    client.getChainId(),
  ]);
  const rawTxn = new TxnBuilderTypes.RawTransaction(
    TxnBuilderTypes.AccountAddress.fromHex(sender.address()),
    BigInt(sequenceNumber),
    scriptFunctionPayload,
    100000n,
    1000n,
    BigInt(Math.floor(Date.now() / 1000) + 60),
    new TxnBuilderTypes.ChainId(chainId),
  );
  const bcsTxn = AptosClient.generateBCSTransaction(sender, rawTxn);
  return client.submitSignedBCSTransaction(bcsTxn);
}
