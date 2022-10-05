const { verifyJWTToken } = require("../../utils/jwtToken");
const extractToken = require("../../utils/extractToken");

module.exports = function context({ req }) {
  const token = extractToken(req);

  if (!token) {
    return { auth: undefined };
  }

  const auth = verifyJWTToken(token);

  return { auth };
};
