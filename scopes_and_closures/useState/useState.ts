/**
 * 1. Типизировать функцию, чтобы мы могли передавать значение конкретного типа с помощью Generics
 * 2. Функция должны возвращать массив [state, dispatcher]
 * 3. dispatcher может быть принимать как функцию, так и значение
 * dispatcher(10) / dispatcher((prevState) => prevState + 5)
 *
 * @param initialState
 */
type SetStateCallback<T> = (prevState: T) => T;
type GetState<T> = () => T;
type SetState<T> = (newState: T | ((prevState: T) => T)) => void;

function isFunction<T>(value: T | SetStateCallback<T>): value is (prevState: T) => T {
  return typeof value === 'function';
}

// let someVar: string | number | boolean = 1;
// someVar = 'Ivan'
// someVar = true; 

export const useState = <T>(initialState: T | (() => T)): [GetState<T>, SetState<T>] => {
  let state: T = isFunction(initialState) ? initialState() : initialState;

  const dispatcher: SetState<T> = (newState) => {
    if (isFunction(newState)) {
      state = newState(state);
    } else {
      state = newState;
    }
  };


  const getState: GetState<T> = () => {
    return state;
  }


  return [getState, dispatcher];
}