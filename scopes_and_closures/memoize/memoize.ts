function memoize<T extends (...args: any[]) => any>(func: T) {
  const cache = new Map();

  // @ts-ignore
  return function(...args) {
    const key = args.toString();

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  }
}

export { memoize };
