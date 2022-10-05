const dayjs = require("dayjs");
/**
 *
 * @param {object} inputData Option for audioContext
 * @returns Created audioContext
 */
exports.getDate = () => {
  return dayjs(Date.now()).format("YYYY-MM-DD HH:mm");
};
