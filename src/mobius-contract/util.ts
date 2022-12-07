export const convertRecordToValueArr = <T>(r: Record<string, T>): T[] => {
  let res: T[] = [];
  for(const key in r) {
    res.push(r[key])
  }
  return res;
}
