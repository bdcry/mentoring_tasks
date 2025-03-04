function memoize<T extends (...args: Parameters<T>) => ReturnType<T>>(func: T) {
  const cache = new Map<string, ReturnType<T>>();

  return function(...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    // Вместо этой строчки. Так как могут быть проблемы при приведении объектов к строке [Object object]
    // const key = args.toString();

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  }
}

export { memoize };
