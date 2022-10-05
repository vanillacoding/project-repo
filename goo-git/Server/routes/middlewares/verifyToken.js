const UserService = require('../../services/user.service');
const { decode } = require('../../utils/jwt');
const { responseResults } = require('../../constants');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = decode(token);

    const user
      = await new UserService()
        .getUserByMongooseId(decoded._id);

    if (!user) {
      res.status(404).json({
        result: responseResults.FAILURE,
        message: '이용자를 찾지 못했어요',
      });
    }

    res.locals.decodedUserId = user._id;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyToken;
