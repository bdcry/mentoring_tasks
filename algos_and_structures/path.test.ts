import { describe, it, expect } from 'vitest';
import { path } from './path';

describe('Тестирование функции path', () => {
    const object = { a: [{ b: { c: 3 } }] };

    // 1. Получение значения по строковому пути
    it('should get value by string path', () => {
        expect(path(object, 'a[0].b.c')).toBe(3);
        expect(path(object, 'a.0.b.c')).toBe(3);
    });

    // 2. Получение значения по массиву ключей
    it('should get value by array path', () => {
        expect(path(object, ['a', '0', 'b', 'c'])).toBe(3);
    });

    // 3. Возврат значения по умолчанию, если путь не существует
    it('should return default value if path does not exist', () => {
        expect(path(object, 'a.b.c', 'default')).toBe('default');
        expect(path(object, 'x.y.z', 'default')).toBe('default');
    });

    // 4. Работа с вложенными объектами и массивами
    it('should handle nested objects and arrays', () => {
        expect(path(object, 'a[0].b')).toEqual({ c: 3 });
        expect(path(object, 'a[0]')).toEqual({ b: { c: 3 } });
    });

    // 5. Обработка пустого пути
    it('should return the object itself if path is empty', () => {
        expect(path(object, '')).toEqual(object);
        expect(path(object, [])).toEqual(object);
    });

    // 6. Обработка некорректных входных данных
    it('should handle invalid inputs', () => {
        expect(path(null, 'a.b.c', 'default')).toBe('default');
        expect(path(undefined, 'a.b.c', 'default')).toBe('default');
        expect(path({}, 'a.b.c', 'default')).toBe('default');
    });

    // 7. Работа с массивами
    it('should handle arrays correctly', () => {
        const array = [{ a: 1 }, { a: 2 }];
        expect(path(array, '[0].a')).toBe(1);
        expect(path(array, '1.a')).toBe(2);
        expect(path(array, '2.a', 'default')).toBe('default');
    });

    // 8. Работа с путями, содержащими специальные символы
    it('should handle paths with special characters', () => {
        const obj = { 'a.b': { 'c.d': 3 } };
        expect(path(obj, 'a.b.c.d', 'default')).toBe('default');
        expect(path(obj, ['a.b', 'c.d'])).toBe(3);
    });

    // 9. Работа с путями, содержащими числа
    it('should handle paths with numbers', () => {
        const obj = { 1: { 2: { 3: 'value' } } };
        expect(path(obj, '1.2.3')).toBe('value');
        expect(path(obj, ['1', '2', '3'])).toBe('value');
    });

    // 10. Работа с путями, содержащими undefined или null
    it('should handle paths with undefined or null', () => {
        const obj = { a: { b: null, c: undefined } };
        expect(path(obj, 'a.b')).toBe(null);
        expect(path(obj, 'a.c')).toBe(undefined);
        expect(path(obj, 'a.c', 'default')).toBe('default');
    });

    // 11. Работа с путями, содержащими пустые строки
    it('should handle paths with empty strings', () => {
        const obj = { '': { '': 'value' } };
        expect(path(obj, '..')).toBe('value');
        expect(path(obj, ['', ''])).toBe('value');
    });

    // 12. Работа с путями, содержащими пробелы
    it('should handle paths with spaces', () => {
        const obj = { 'a b': { 'c d': 3 } };
        expect(path(obj, 'a b.c d')).toBe(3);
        expect(path(obj, ['a b', 'c d'])).toBe(3);
    });

    // 13. Работа с путями, содержащими квадратные скобки
    it('should handle paths with square brackets', () => {
        const obj = { 'a[0]': { 'b[1]': 3 } };
        expect(path(obj, 'a[0].b[1]')).toBe(3);
        expect(path(obj, ['a[0]', 'b[1]'])).toBe(3);
    });

    // 14. Работа с путями, содержащими точки
    it('should handle paths with dots', () => {
        const obj = { 'a.b': { 'c.d': 3 } };
        expect(path(obj, 'a.b.c.d')).toBe(3);
        expect(path(obj, ['a.b', 'c.d'])).toBe(3);
    });

    // 15. Работа с путями, содержащими несуществующие ключи
    it('should handle paths with non-existent keys', () => {
        expect(path(object, 'x.y.z', 'default')).toBe('default');
        expect(path(object, ['x', 'y', 'z'], 'default')).toBe('default');
    });
});