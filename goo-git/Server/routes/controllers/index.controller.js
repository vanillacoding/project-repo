const UserService = require('../../services/user.service');
const { encode } = require('../../utils/jwt');
const { responseResults } = require('../../constants');
const tryCatchWrapper = require('../../utils/tryCatchWrapper');

const userService = new UserService();

exports.registerUser = async (req, res, next) => {
  const { uid, email, displayName, photoURL } = req.body;

  try {
    await userService
      .createUser(uid, email, displayName, photoURL);

    res.status(201).json({ result: responseResults.OK });
  } catch (err) {
    if (err.message.includes('duplicate key error')) {
      res.status(303).json({
        result: responseResults.FAILURE,
        message: '이미 가입했어요',
      });

      return;
    }

    next(err);
  }
};

exports.loginUser = tryCatchWrapper(async (req, res) => {
  const { email } = req.body;
  const user = await userService.getUserByEmail(email);

  if (!user) {
    res.status(404).json({
      result: responseResults.FAILURE,
      message: '가입하지 않은 사용자예요',
    });
  }

  const token = encode(user);

  res.status(200).json({
    result: responseResults.OK,
    user,
    token,
  });
});
