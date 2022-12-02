import {AptosAccount, AptosClient, MaybeHexString} from "aptos";
import { getAptosClients, aptosAccountFromPrivateKey, AptosNet } from "./common";
import { scriptTransaction } from "./transaction";
import { getResource, checkBalance, checkBalances } from './resource';
import { entryFunCall, entryFunSimulate, EntryFuncParams } from './transaction/entry_fun_txn';
import { queryFromSimulation } from './transaction/query_from_simulation_txn';

export class Aptox {
  private account: AptosAccount;
  private client: AptosClient;
  public constructor(privKey: string | undefined, net: AptosNet = "dev") {
    this.account = privKey ? aptosAccountFromPrivateKey(privKey) : new AptosAccount();
    this.client = getAptosClients(net).aptosClient;
  }
  public async scriptTxn(codePath: string) {
    return scriptTransaction(codePath, [], [], this.client, this.account);
  }
  public async entryFunSimulate(entryFuncParams: EntryFuncParams) {
    return entryFunSimulate(entryFuncParams, this.client, this.account);
  }
  public async entryFunCall(entryFuncParams: EntryFuncParams) {
    return entryFunCall(entryFuncParams, this.client, this.account);
  }
  public async queryFromEntryFunSimulation<StructType>(entryFuncParams: EntryFuncParams, structName: string) {
    return queryFromSimulation<StructType>(entryFuncParams, structName, this.client)
  }
  public async getResource<T>(resourceType: string, address?: string) {
    const addressToUse = address || this.account.address();
    return getResource<T>(addressToUse, resourceType, this.client);
  }
  public async checkBalance(coinType: string, address?: MaybeHexString) {
    const addressToUse = address || this.account.address();
    return checkBalance(addressToUse, coinType, this.client);
  }
  public async checkBalances(coinTypes: string[], address?: MaybeHexString) {
    const addressToUse = address || this.account.address();
    return checkBalances(addressToUse, coinTypes, this.client);
  }
}
