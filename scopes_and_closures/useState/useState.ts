/**
 * 1. Типизировать функцию, чтобы мы могли передавать значение конкретного типа с помощью Generics
 * 2. Функция должны возвращать массив [state, dispatcher]
 * 3. dispatcher может быть принимать как функцию, так и значение
 * dispatcher(10) / dispatcher((prevState) => prevState + 5)
 *
 * @param initialState
 */

// @ts-ignore
export function useState(initialState) {
  let state = typeof initialState === 'function' ? initialState() : initialState;
  // @ts-ignore
  function dispatcher(newState) {
    state = typeof newState === 'function' ? newState(state) : newState;
  }


  function getState() {
    return state;
  }


  return [getState, dispatcher];
}