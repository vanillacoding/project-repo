const jwt = require("jsonwebtoken");

const User = require("../model/User");

function isTokenExpired(token) {
  const now = Date.now().valueOf() / 1000;

  return !token || (token.exp < now);
}

function isTokenValid(token, targetUser) {
  return String(token.refreshAuth) === String(targetUser.refreshAuth);
}

module.exports.authToken = async (req, res, next) => {
  const {
    body: { accessToken, refreshToken }
  } = req;

  if (!accessToken || !refreshToken) {
    return res.json({
      message: "No Token"
    });
  }

  try {
    const decodedAccessToken = jwt.decode(accessToken);
    const decodedRefreshToken = jwt.decode(refreshToken);

    if (isTokenExpired(decodedAccessToken)) {
      if (isTokenExpired(decodedRefreshToken)) {
        return res.json({ message: "Token expired" });
      }

      const refreshTargetUser = await User.findOne({
        email: decodedRefreshToken.email
      }).lean();

      if (!isTokenValid(decodedRefreshToken, refreshTargetUser)) {
        return res.json({ message: "Invalid Token" });
      }

      const newAccessToken = jwt.sign(
        {
          email: refreshTargetUser.email
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30m"
        }
      );

      req.user = refreshTargetUser;
      req.accessToken = newAccessToken;
      return next();
    }

    const user = await User.findOne({
      email: decodedAccessToken.email
    }).lean();

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ warning: "Internal server Error" });
  }
}
