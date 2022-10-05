/**
 * The function makes intended delay time
 * @param {number} delay Delay time (ms)
 * @returns Promise containing setTimeout
 */
const wait = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

export default wait;
