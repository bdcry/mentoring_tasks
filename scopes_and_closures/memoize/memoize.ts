function memoize<T extends (...args: any[]) => any>(func: T) {
  const cashe = new Map();

  // @ts-ignore
  return function(...args) {
    const key = args.toString();

    if (cashe.has(key)) {
      return cashe.get(key);
    }

    const result = func(...args);
    cashe.set(key, result);
    return result;
  }
}

export { memoize };
