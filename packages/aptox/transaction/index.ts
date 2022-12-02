import { AptosAccount, AptosClient, TxnBuilderTypes } from "aptos";
import { loadBytecode } from "./load_bytecode";
import { submitScriptTransaction, ScriptCtx } from "./submit_script_transaction";

// const codePath = "xx/build/xx/bytecode_scripts/register_coin.mv";
export const scriptTransaction = async (
  codePath: string,
  tyArgs: TxnBuilderTypes.TypeTag[],
  args: TxnBuilderTypes.TransactionArgument[],
  aptosClient: AptosClient,
  aptosAccount: AptosAccount
  ) => {
  const bytecode = loadBytecode(codePath);
  const scriptCtx: ScriptCtx = { bytecode, tyArgs, args };
  const txn = await submitScriptTransaction(scriptCtx, aptosAccount, aptosClient);
  return aptosClient.waitForTransaction(txn.hash);
}
