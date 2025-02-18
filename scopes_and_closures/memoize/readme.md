# Реализовать функцию memoize

> Этот метод, который кеширует значение между вызовами. То есть он не пересчитывает его, если не изменились аргументы

```javascript
const sum = (a: number, b: number) => {
    callCount++;
    return a + b;
};

// Мемоизируем функцию
const memoizedSum = memoize(sum);

expect(memoizedSum(1, 2)).toBe(3); // Вычисляется и сохраняется в кэше
expect(memoizedSum(1, 2)).toBe(3); // Значение не пересчиывается, а берется из внутреннего кеша
expect(memoizedSum(1, 3)).toBe(4); // Значение пересчитывается и сохрнаяется в кэше
```

## Чтобы запустить тесты

`yarn vitest scopes_and_closures/memoize/memoize.test.ts`

## Полезные ссылки

1. [Документация хука useMemp на странице react.dev](https://react.dev/reference/react/useMemo)
2. [Пример реализации useMemo на просторах git](https://gist.github.com/ultrox/5159cf0a57054ae92f0cae72f4706c97#file-usememousecallback-js-L65)
3. [Реализация хуков в репозитории react](https://github.com/facebook/react/blob/main/packages/react/src/ReactHooks.js#L169)
4. [Про замыкание doka](https://doka.guide/js/closures/)
5. [Про замыкание mdn](https://developer.mozilla.org/ru/docs/Web/JavaScript/Closures)
6. [Про функции doka](https://doka.guide/js/function/)