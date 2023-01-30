const createError = require("http-errors");
const { admin } = require("../../../config/firebase.config");

const { UNAUTHORIZED } = require("../../constants");

const User = require("../../../models/User");

const verifyToken = async (req, res, next) => {
  try {
    const sessionCookie = req.cookies.session;
    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true);

    const { uid: providerId } = decodedClaims;

    req.user = await User
      .findOne({ providerId })
      .lean()
      .populate("projects")
      .exec();

    next();
  } catch (error) {
    next(createError(401, UNAUTHORIZED));
  }
};

module.exports = verifyToken;
