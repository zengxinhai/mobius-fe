import { BCS } from 'aptos';

export enum UintType {
  u8 = 'u8',
  u16 = 'u16',
  u32 = 'u32',
  u64 = 'u64',
  u128 = 'u128'
}

export class EntryFuncArgs {
  static fromHexString(hexString: string): Uint8Array {
    if (hexString.length % 2 !== 0) throw Error('Bad hex string');
    const bytes = hexString.match(/.{1,2}/g);
    if (bytes === null) return Uint8Array.from([]);
    return Uint8Array.from(bytes.map((byte) => parseInt(byte, 16)));
  }
  static toHexString(bytes: Uint8Array): string {
    return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
  }

  static fromNumber(num: number, uintType: UintType = UintType.u64): Uint8Array {
    switch(uintType) {
      case UintType.u8: return BCS.bcsSerializeU8(num);
      case UintType.u16: return BCS.bcsSerializeU16(num);
      case UintType.u32: return BCS.bcsSerializeU32(num);
      case UintType.u64: return BCS.bcsSerializeUint64(num);
      case UintType.u128: return BCS.bcsSerializeU128(num);
    }
  }
}
