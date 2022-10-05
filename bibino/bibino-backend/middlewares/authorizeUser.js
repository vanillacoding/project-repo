const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const User = require("../models/User");
const getIdToken = require("../utils/getIdToken");
const { validateToken } = require("../utils/validationHandler");
const { appPrivateKey } = require("../config");

const authorizeUser = async (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization?.startsWith("Bearer ")) {
    try {
      const idToken = getIdToken(authorization);
      const { error } = validateToken(idToken);

      if (error) {
        return next(createError(401, error));
      }

      const userId = jwt.verify(idToken, appPrivateKey);
      const { _id, name, imagePath } = await User.findById(userId).lean();

      res.locals.user = { id: _id, name, imagePath };
      return next();
    } catch (err) {
      next(createError(401, new Error("Unauthorized ID token")));
    }
  } else {
    return next(createError(401, new Error("Unauthorized ID token")));
  }
};

module.exports = authorizeUser;
