import { expect, test } from "vitest";

import { useState } from "./useState";

// Тест 1: Инициализация состояния
test("useState should initialize state correctly", () => {
    const [getState] = useState(42);
    expect(getState()).toBe(42);
});

// Тест 2: Обновление состояния с новым значением
test("useState should update state with a new value", () => {
    const [getState, setState] = useState(0);
    setState(10);
    expect(getState()).toBe(10);
});

// Тест 3: Обновление состояния с функцией
test("useState should update state with a function", () => {
    const [getState, setState] = useState(5);
    setState((prev) => prev + 5);
    expect(getState()).toBe(10);
});

// Тест 4: Инициализация состояния с функцией
test("useState should initialize state with a function", () => {
    const [getState] = useState(() => 100);
    expect(getState()).toBe(100);
});

// Тест 5: Множественные обновления состояния
test("useState should handle multiple state updates", () => {
    const [getState, setState] = useState(0);
    setState(1);
    setState((prev) => prev + 1);
    setState((prev) => prev + 1);
    expect(getState()).toBe(3);
});