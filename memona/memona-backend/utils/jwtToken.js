const jwt = require("jsonwebtoken");
const { JWT_TOKEN_SECRET, JWT_TOKEN_EXPIRES_IN } = process.env;

exports.signJWTToken = function (data) {
  const secret = JWT_TOKEN_SECRET;
  const payload = data;
  const options = { expiresIn: JWT_TOKEN_EXPIRES_IN };
  const jwtToken = jwt.sign(payload, secret, options);

  return jwtToken;
};

exports.verifyJWTToken = function (token) {
  const verifedResult = jwt.verify(
    token, JWT_TOKEN_SECRET, (error, payload) => {
      if (error) {
        return null;
      }

      return payload;
    }
  );

  return verifedResult;
};
