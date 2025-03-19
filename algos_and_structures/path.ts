export const path = (obj: any, path: string | Array<string | number>, defaultValue: string): any | undefined => {
  if (path.length === 0) {
    return obj;
  }

  if (obj === null || obj === undefined || Object.keys(obj).length === 0) {
    return defaultValue;
  }

  const keys = Array.isArray(path) ? path : path.split('.');
  console.log(keys);

  let result = obj;

  for (const key of keys) {
    if (result === undefined) return defaultValue;
    result = result[key];
  }

  return result === undefined ? defaultValue : result;
}