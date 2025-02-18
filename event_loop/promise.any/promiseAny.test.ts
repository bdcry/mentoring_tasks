import { describe, expect, test } from 'vitest'
import { promiseAnyAsyncAwait, promiseAnyThenCatch } from './promiseAny'
import { rejectedDelay, resolvedDelay } from 'shared/delay';

describe("Проверка реализации Promise.any с async/await", () => {
    test("check first resolved", async () => {
        const promise1 = resolvedDelay(1000, "First");
        const promise2 = resolvedDelay(2000, "Second");
        const promise3 = resolvedDelay(500, "Third");

        const result = await promiseAnyAsyncAwait([promise1, promise2, promise3]);

        // Ожидаем, что результат будет равен первому успешно выполненному промису
        expect(result).toBe("Third"); // "Third" выполнится первым
    });

    test("check all rejected", async () => {
        const promise1 = rejectedDelay(1000, "First");
        const promise2 = rejectedDelay(2000, "Second");
        const promise3 = rejectedDelay(500, "Third");

        // Ожидаем, что все промисы отклонятся, и получим агрегированную ошибку
        await expect(promiseAnyAsyncAwait([promise1, promise2, promise3])).rejects.toThrow(
            "All promises were rejected"
        );
    });
});

describe("Проверка реализации Promise.any через then/catch", () => {
    test("check first resolved", async () => {
        const promise1 = resolvedDelay(1000, "First");
        const promise2 = resolvedDelay(2000, "Second");
        const promise3 = resolvedDelay(500, "Third");

        const result = await promiseAnyThenCatch([promise1, promise2, promise3]);

        // Ожидаем, что результат будет равен первому успешно выполненному промису
        expect(result).toBe("Third"); // "Third" выполнится первым
    });

    test("check all rejected", async () => {
        const promise1 = rejectedDelay(1000, "First");
        const promise2 = rejectedDelay(2000, "Second");
        const promise3 = rejectedDelay(500, "Third");

        // Ожидаем, что все промисы отклонятся, и получим агрегированную ошибку
        await expect(promiseAnyThenCatch([promise1, promise2, promise3])).rejects.toThrow(
            "All promises were rejected"
        );
    });
});