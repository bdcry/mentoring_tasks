export const promiseAllAsyncAwait = async <T>(promises: Promise<T>[]): Promise<T[]> => {
  const result = [];

  for (const promise of promises) {
    const response = await promise;
    result.push(response);
  }
  return result;
}

export const promiseAllThenCatch = <T>(promises: Promise<T>[]): Promise<T[]> => {
  const results: T[] = [];
  let counter = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then((data) => {
          results[index] = data;
          counter++;

          if (counter === promises.length) {
            resolve(results);
          }
        })
        .catch((err) => reject(err));
    })
  })
}

// вопрос по тестам: если указать Second/Third, то все упадет с ошибкой.
// вопрос номер 2: как в данном случае работают тесты? как они понимают, что результат кетча верный, если в моей реализации результаты работы промисов расставляются по индексам, а не по их очередности?
// мои же мысли: логично, что они просто сравнивают результат выполнения. получается, что когда ошибка должна быть в First, то в массиве results уже будет присутствовать Third(тк по таймату быстрее выполнится). 