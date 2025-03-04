
// Возвращаемое значение Promise<T>
// Промис работает не совсем корректно, так ка квсе равно выполняет промисы последовательно
// с async await нельзя написать хороший promise any. Это как раз тот случай, когда нужна параллельная обработка промисов
// @ts-ignore
export const promiseAnyAsyncAwait = async <T>(promises: Promise<T>[]): Promise<T> => {
  let minTime = Infinity;
  let fastestResult = null;

  let rejectedCount = 0;

  for (const promise of promises) {
    try {
      const startTime = Date.now();
      const response = await promise;
      const endTime = Date.now() - startTime;
      rejectedCount++

      if (endTime < minTime) {
        minTime = endTime;
        fastestResult = response;
      }
    } catch (err) {
      rejectedCount += 1
      if (rejectedCount === promises.length) {
        throw new Error('All promises were rejected');
      }
    }
  }

  if (fastestResult) {
    // @ts-ignore
    return fastestResult;
  } else {
    throw new Error('All promises were rejected');
  }
};

export const promiseAnyThenCatch = <T>(promises: Promise<T>[]): Promise<T> => {
  let rejectedCount = 0;
  return new Promise((resolve, reject) => {
    for (const promise of promises) {
      promise
        .then(data => resolve(data))
        .catch(() => {
          rejectedCount++;

          if (promises.length === rejectedCount) {
            reject(new Error('All promises were rejected'));
          }
        })
    }
  })
}