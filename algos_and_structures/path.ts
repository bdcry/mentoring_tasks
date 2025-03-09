  const parsePath = (path: string | Array<string | number>): Array<string | number> => {
    if (Array.isArray(path)) return path;

    return path
      .replace(/\[/g, '.')
      .replace(/\]/g, '')
      .split('.')
      .filter((key: string) => key !== '');
  };

  export const path = <T extends Record<string | number, any>>(obj: T, path: string | Array<string | number>, defaultValue: T): T | undefined => {
    if (path.length === 0) {
      return obj;
    }

    if (!obj) {
      return defaultValue;
    }

    const keys = parsePath(path);

    let result = obj;

    for (const key of keys) {
      if (result === undefined) return defaultValue;
      result = result[key];
    }
    return result === undefined ? defaultValue : result;
  };
