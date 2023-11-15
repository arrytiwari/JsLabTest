const allSettled = (promises) => new Promise((resolve) => {
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
    const handleResult = (status, value) => {
      results[index] = { status, value };
      completedCount += 1;
      checkCompletion();
    };

    if (promise instanceof Promise) {
      promise
        .then((value) => handleResult('fulfilled', value))
        .catch((reason) => handleResult('rejected', reason));
    } else {
      handleResult('fulfilled', promise);
    }
  });
});

export { allSettled };
