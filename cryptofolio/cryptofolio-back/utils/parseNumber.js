const NANRegex = /[^0-9.]/g;
/**
 *
 * @param {object} inputData Option for audioContext
 * @returns Created audioContext
 */
exports.parseNumber = (input) => {
  if (!input) {
    return null;
  }

  const billion = input.split(" ")[0];
  let result = input.replace(NANRegex, "");

  if (billion.includes("B")) {
    result *= 1000000000;
  }

  return parseFloat(result);
};
