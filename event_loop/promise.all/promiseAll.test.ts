import { describe, expect, test } from 'vitest'
import { promiseAllAsyncAwait, promiseAllThenCatch } from './promiseAll'
import { rejectedDelay, resolvedDelay } from 'shared/delay';

describe("Проверка реализации promise all с async await", () => {
    test('check all resolved', async () => {
        const promise1 = resolvedDelay(1000, "First");
        const promise2 = resolvedDelay(2000, "Second");
        const promise3 = resolvedDelay(500, "Third");

        const results = await promiseAllAsyncAwait([promise1, promise2, promise3]);

        expect(results).toStrictEqual(["First", "Second", "Third"]);
    })

    test('check one rejected', async () => {
        const promise1 = rejectedDelay(1000, "First");
        const promise2 = resolvedDelay(2000, "Second");
        const promise3 = resolvedDelay(500, "Third");

        await expect(promiseAllAsyncAwait([promise1, promise2, promise3])).rejects.toThrow("First");
    })
})

describe("Проверка реализации promise all через then catch", () => {
    test('check all resolved', async () => {
        const promise1 = resolvedDelay(1000, "First");
        const promise2 = resolvedDelay(2000, "Second");
        const promise3 = resolvedDelay(500, "Third");

        const results = await promiseAllThenCatch([promise1, promise2, promise3]);

        expect(results).toStrictEqual(["First", "Second", "Third"]);
    })

    test('check one rejected', async () => {
        const promise1 = rejectedDelay(1000, "First");
        const promise2 = resolvedDelay(2000, "Second");
        const promise3 = resolvedDelay(500, "Third");

        await expect(promiseAllThenCatch([promise1, promise2, promise3])).rejects.toThrow("First");
    })
})