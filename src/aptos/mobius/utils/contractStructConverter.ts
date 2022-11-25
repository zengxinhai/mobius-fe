import { Exp, TypeInfo, RateCard } from '../contract-types'

const exp_scale = 10**18;
export const convertExp = (exp: Exp) => exp.mantissa / exp_scale;

function _hexToAscii(hexStr: string){
  let strOut = '';
  for (let x = 2; x < hexStr.length; x += 2) {
    const charStr = hexStr.slice(x, x + 2);
    const charCode = parseInt( charStr, 16);
    strOut += String.fromCharCode(charCode);
  }
  return strOut;
}

export const convertTypeInfo = (info: TypeInfo) => {
  const moduleName = _hexToAscii(info.module_name);
  const structName = _hexToAscii(info.struct_name);
  return `${info.account_address}::${moduleName}::${structName}`
}

export const convertRateCard = (r: RateCard) => {
  const tokenType = convertTypeInfo(r.token_code);
  const borrowRate = convertExp(r.borrow_rate);
  const supplyRate = convertExp(r.supply_rate);
  return { tokenType, borrowRate, supplyRate }
}
