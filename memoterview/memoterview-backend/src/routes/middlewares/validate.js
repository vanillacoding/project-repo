const createError = require("http-errors");

module.exports = function validate(schema, property) {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      if (property === "params") {
        return next(createError(404, { message }));
      }

      return next(createError(422, { message }));
    }
  };
};
