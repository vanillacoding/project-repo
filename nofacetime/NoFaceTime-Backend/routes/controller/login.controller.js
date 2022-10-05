const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../../config');
const { RESPONSE_MESSAGE } = require('../../utils/constants');

const User = require('../../models/User');
const Group = require('../../models/Group');

const UserService = require('../../services/User');
const GroupService = require('../../services/Group');

const userService = new UserService(User);
const groupService = new GroupService(User, Group);

exports.loginAndIssueToken = async (req, res, next) => {
  try {
    const payload = req.body;
    const { email, nickname } = req.body;
    let loginUserData = await userService.getUserData({ 'email': email }); // 객체

    if (!loginUserData) {
      loginUserData = await userService.addUserData(payload);
    }

    const token = jwt.sign(
      payload,
      JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.cookie(
      'token',
      token,
      {
        httpOnly: false,
        secure: false,
        maxAge: 60 * 60 * 1000
      }
    );

    return res.json({ loginUserData });
  } catch (err) {
    console.error(err);
  }
};
