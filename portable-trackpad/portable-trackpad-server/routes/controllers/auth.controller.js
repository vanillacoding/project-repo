const { OAuth2Client } = require("google-auth-library");
const User = require("../../models/User");
const createError = require("http-errors");
const ERROR = require("../../constants/error");

exports.googleAuth = async (req, res, next) => {
  const client = new OAuth2Client(process.env.EXPO_CLIENT_ID);
  const { idtoken } = req.headers;

  let decoded;

  try {
    decoded = await client.verifyIdToken({
      idToken: idtoken,
      audience: process.env.EXPO_CLIENT_ID,
    });
  } catch (error) {
    next(error);
  }

  if (!decoded) {
    next(createError(401, ERROR.INVALID_TOKEN));
  }

  try {
    const { name, email } = decoded.payload;

    const user = await User.findOne({ email });

    if (!user) {
      await User.create({ name, email });
    }

    res.json({ user, idToken: idtoken });
  } catch (error) {
    next(error);
  }
};
