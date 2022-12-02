import {AptosClient, MaybeHexString} from 'aptos';
import { Result } from '../types';

export const getResource = async <T>(address: MaybeHexString, resourceType: string, client: AptosClient): Promise<Result<T>> => {
  try {
    const res = await client.getAccountResource(address, resourceType);
    return { ok: true, data: res.data as T, error: "" }
  } catch(e) {
    return { ok: false, data: null, error: 'network error' }
  }
}
