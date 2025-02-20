import { expect, test } from "vitest";

import { useState } from "./useState";

// Тест 1: Инициализация состояния
test("useState should initialize state correctly", () => {
    const [state] = useState(42);
    
    expect(state).toBe(42);
});

// Тест 2: Обновление состояния с новым значением
test("useState should update state with a new value", () => {
    const [state, setState] = useState(0);
    setState(10);
    
    expect(state).toBe(10);
});

// Тест 3: Обновление состояния с функцией
test("useState should update state with a function", () => {
    const [state, setState] = useState(5);
    setState((prev) => prev + 5);
    expect(state).toBe(10);
});

// Тест 4: Инициализация состояния с функцией
test("useState should initialize state with a function", () => {
    const [state] = useState(() => 100);
    expect(state).toBe(100);
});

// Тест 5: Множественные обновления состояния
test("useState should handle multiple state updates", () => {
    const [state, setState] = useState(0);
    setState(1);
    setState((prev) => prev + 1);
    setState((prev) => prev + 1);
    expect(state).toBe(3);
});