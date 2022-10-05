const debounce = (callback, delay) => {
  let debounceTimeoutId = null;

  return (...args) => {
    if (debounceTimeoutId) {
      clearTimeout(debounceTimeoutId);

      debounceTimeoutId = null;
    }

    debounceTimeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export default debounce;
