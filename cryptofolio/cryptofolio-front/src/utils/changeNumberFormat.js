/**
 *
 * @param {number} number target Number
 * @param {type} string format type
 * @returns {string} formatted number
 */
const changeNumberFormat = (number, type) => {
  const COMMA_REGEX = /\B(?=(\d{3})+(?!\d))/g;

  if (typeof number !== "number") {
    number = parseFloat(number);
  }

  if (type === "cut") {
    const formatted = parseInt(number / 100000000).toString() + "억";
    return formatted.replace(COMMA_REGEX, ",");
  }

  if (type === "int") {
    number = parseInt(number, 10);
    return number.toString().replace(COMMA_REGEX, ",");
  }

  return number.toFixed(2).toString().replace(COMMA_REGEX, ",");
};

export default changeNumberFormat;
