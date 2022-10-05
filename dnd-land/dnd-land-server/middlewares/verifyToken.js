const jwt = require("jsonwebtoken");
const createError = require("http-errors");

exports.verifyToken = async function (req, res, next) {
  try {
    await jwt.verify(req.headers.authorization, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return next(createError(401, err));
      }

      req.userId = decoded.id;

      next();
    });
  } catch (err) {
    next(createError(500, err));
  }
};
