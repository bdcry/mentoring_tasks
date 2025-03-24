type Path = string | Array<string | number>;

const pathParser = (path: Path, obj: any) => {
  if (Array.isArray(path)) return path;


  const simpleKeys = typeof path === 'string' ? path.split('.') : [];
  let result = obj;
  let success = true;

  for (const key of simpleKeys) {
    if (result !== null && key !== '' && key in result) {
      result = result[key]
    } else { 
      success = false;
    }
  }

  if (success && result !== undefined) {
    return simpleKeys;
  }

  // тут логика такая:
  // ищем все подстроки, которые начинаются с [ , за ней следует одна и более цифр \d+, и далее ].
  // круглые скобки - это группа (о да, спасибо regexp и гпт за это пояснение) => мы заменяем [0] на группу , то есть на .группа => .0
  // ну и далее, если это начало массива, то просто обрезаем эту точку и передаем ключи. если нет, то на нет и суда нет.
  // ну и в конце все это разбиваем на отдельные клюичики
  const replaced = path.replace(/\[(\d+)\]/g, '.$1');
  const trim = replaced.startsWith('.') ? replaced.slice(1) : replaced;
  return trim.split('.');
};


export const path = (obj: any, path: Path, defaultValue: string): any | undefined => {
  if (path.length === 0) {
    return obj;
  }

  if (obj === null || obj === undefined || Object.keys(obj).length === 0) {
    return defaultValue;
  }

  const keys = pathParser(path, obj);
  console.log(keys);

  let result = obj;

  for (const key of keys) {
    if (result === undefined) return defaultValue;
    result = result[key];
  }

  return result === undefined ? defaultValue : result;
}