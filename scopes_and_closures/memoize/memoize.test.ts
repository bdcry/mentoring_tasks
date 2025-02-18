import { describe, test, expect } from "vitest";
import { memoize } from "./memoize";

describe('memoize', () => {
    test('Проверяем, что значение кешируется, если аргументы не изменились', () => {
        let callCount = 0;

        const sum = (a: number, b: number) => {
            callCount++;
            return a + b;
        };

        const memoizedSum = memoize(sum);

        expect(memoizedSum(1, 2)).toBe(3); // Вычисляется и сохраняется в кэше
        expect(callCount).toBe(1);

        // Вызываем с теми же аргументами
        expect(memoizedSum(1, 2)).toBe(3); // Берет из кэша
        expect(callCount).toBe(1); // Не вызывается снова

        // Вызываем с новыми аргументами
        expect(memoizedSum(2, 3)).toBe(5); // Вычисляется и сохраняется в кэше
        expect(callCount).toBe(2); // проверяем, что был вызов функции

    });

    test('Проверяем с другими типами аргументов', () => {

        let callCountStringConcat = 0;

        const concatStrings = (str1: string, str2: string) => {
            callCountStringConcat++;
            return str1 + str2;
        };

        const memoizedConcatStrings = memoize(concatStrings);

        expect(memoizedConcatStrings("Hello", "World")).toBe("HelloWorld");
        expect(callCountStringConcat).toBe(1);

        expect(memoizedConcatStrings("Hello", "World")).toBe("HelloWorld");
        expect(callCountStringConcat).toBe(1);

    });
});