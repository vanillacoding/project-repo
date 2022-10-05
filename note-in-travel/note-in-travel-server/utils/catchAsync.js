/**
 * Wrap async function with try-catch
 * @param {async function} fn - callback function of router
 * @returns async function wrapped with try-catch
 */
module.exports = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    next(err);
  }
};
