const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const User = require("../models/User");
const {
  SERVER_MESSAGE,
  NOT_AUTHENICATED_INFO
} = require("../constants/errorComment");

module.exports.authorizeUser = async (req, res, next) => {
  try {
    const token = req.get("authorization");
    const { userID } = jwt.verify(token, process.env.SECRET_TOKEN);
    const {
      _id,
      email,
      nickname
    } = await User.findById(userID).lean();

    if (!_id) {
      return next(createError(400, NOT_AUTHENICATED_INFO));
    }

    req.userInfo = { email, id: _id, nickname };

    next();
  } catch (err) {
    console.error(err.message);

    next(createError(500, SERVER_MESSAGE));
  }
};
