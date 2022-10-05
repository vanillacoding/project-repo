const createError = require("http-errors");

const authUser = (req, res, next) => {
  const authorization = req.get("authorization");

  if (authorization?.startsWith("Bearer ")) {
    const authToken = authorization.split("Bearer ")[1];
    req.accessToken = authToken;

    if (!authToken) {
      console.warn("no token provided");
    }

    next();
    // Todo : token 401 handling
    // if ( verify token) {
    // "../utils/verifyToken";
    // next();
    // } else {
    //   // 401 unauthorized
    // }
  } else {
    return next(createError(401, new Error("Unauthorized token")));
  }
};

module.exports = authUser;
