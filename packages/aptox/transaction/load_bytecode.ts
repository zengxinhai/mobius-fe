import fs from "fs";
import { HexString } from "aptos";

export const loadBytecode = (scriptPath: string) => {
  const moduleHex = fs.readFileSync(scriptPath).toString("hex");
  return new HexString(moduleHex).toUint8Array();
}
