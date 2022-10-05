function tryCatchWrapper(func) {
  return async function(req, res, next) {
    try {
      return await func(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = tryCatchWrapper;
