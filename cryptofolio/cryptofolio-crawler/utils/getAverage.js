/**
 *
 * @param {object} inputData Option for audioContext
 * @returns Created audioContext
 */
exports.getAverage = (array) => {
  const sum = array.reduce((a, c) => {
    const parsed = parseFloat(c);
    return a + parsed;
  }, 0);

  const num = array.length;

  return (sum / num).toFixed(2);
};
