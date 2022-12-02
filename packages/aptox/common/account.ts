import { AptosAccount, HexString } from "aptos";

export const aptosAccountFromPrivateKey = (privateKey: string) => {
  const privKey = new HexString(privateKey).toUint8Array();
  const aptosAccount = new AptosAccount(privKey);
  return aptosAccount;
}
