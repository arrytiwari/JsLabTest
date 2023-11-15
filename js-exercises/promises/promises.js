const allPromises = (promises) => new Promise((resolve) => {
  const results = [];
  let completedCount = 0;

  if (!promises) {
    return;
  }

  const checkCompletion = () => {
    if (completedCount === promises.length) {
      resolve(results);
    }
  };

  promises.forEach((promise, index) => {
    if (promise instanceof Promise) {
      promise
        .then((value) => {
          results[index] = value;
          completedCount += 1;
          checkCompletion();
        })
        .catch((reason) => {
          resolve(Promise.reject(reason));
        });
    } else {
      results[index] = promise;
      completedCount += 1;
      checkCompletion();
    }
  });
});

export { allPromises };
