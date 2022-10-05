const jwt = require("jsonwebtoken");
const config = require("../config");

exports.signAccessToken = function (user) {
  const secret = config.accessToken.accessTokenSecret;
  const payload = { user };
  const options = { expiresIn: config.accessToken.accessTokenExpiresIn };
  const accessToken = jwt.sign(payload, secret, options);

  return accessToken;
};

exports.verifyAccessToken = function (token) {
  const verifedResult = jwt.verify(
    token, config.accessToken.accessTokenSecret, (error, payload) => {
      if (error) {
        return null;
      }

      return payload;
    }
  );

  return verifedResult;
};
