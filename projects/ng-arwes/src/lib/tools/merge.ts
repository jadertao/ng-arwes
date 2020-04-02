
export function mergeDeep<T>(...objects: Array<Partial<T>>): T {
  function isPlainObject(item: any): boolean {
    return Object.prototype.toString.call(item) === '[object Object]';
  }
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];
      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isPlainObject(pVal) && isPlainObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });
    return prev;
  }, {}) as T;
}
