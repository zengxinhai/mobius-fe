import {useCallback} from "react";
import {useAccount} from "./account";
import { useModuleCaller } from "./module-caller";

export const useCoinTransfer = () => {
  const moduleCaller = useModuleCaller();
  const account = useAccount();
  return useCallback(async (recipient: string, amount: string | number) => {
    if (!moduleCaller || !account) return null;
    const moduleName = "0x1::coin";
    const func = "transfer";
    const typeArgs = ["0x1::aptos_coin::AptosCoin"];
    const args = [recipient, amount.toString()];
    return moduleCaller(moduleName, func, typeArgs, args);
  }, [moduleCaller, account])
}
