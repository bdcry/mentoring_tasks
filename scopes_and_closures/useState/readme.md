## Реализовать хук useState

> Хук useState инициализирует значение и возвращает стейт и функцию для обновления

```javascript
const [state, setState] = useState(5);
setState((prev) => prev + 5);
setState(10);
```

## Чтобы запустить тесты

`yarn vitest scopes_and_closures/useState/useState.test.ts`

## Полезные ссылки

1. [Документация useState на странице react.dev](https://react.dev/reference/react/useState)
2. [Про замыкание doka](https://doka.guide/js/closures/)
3. [Про замыкание mdn](https://developer.mozilla.org/ru/docs/Web/JavaScript/Closures)
4. [Про функции doka](https://doka.guide/js/function/)
5. [Реализация хуков в репозитории react](https://github.com/facebook/react/blob/main/packages/react/src/ReactHooks.js#L169)
6. [Generics в typescript](https://www.typescriptlang.org/docs/handbook/2/generics.html)
7. [Все типы данных в typescript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays)
8. [Unions в typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#unions)