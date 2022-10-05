const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');
const Photo = require('../../models/Photo');

const YOUR_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS);

exports.createUser = async (req, res, next) => {
  try {
    await User.create({ 
      ...req.body,
      passwordHash: bcrypt.hashSync(req.body.password, BCRYPT_SALT_ROUNDS)
    });

    return res.json({ "result": "ok" });
  } catch (error) {
    next({
      status: 500,
      message: 'Internal Server Error'
    });
  };
};

exports.verifyUser = async (req, res, next) => {
  try {
    const { user_id, password } = req.body;
    const user = await User.findOne({ user_id: user_id });
    const photos = await Photo.find({ _id: { $in: user.photos } });

    if (!user) {
      console.log('there is no user');
      return next({
        status: 400,
        message: 'Bad Request'
      });
    }

    if (!bcrypt.compareSync(password, user.passwordHash)) {
      console.log('password is wrong');
      return next({
        status: 400,
        message: 'Bad Request'
      });
    }

    const token = jwt.sign({ user_id }, YOUR_SECRET_KEY, { expiresIn: '1d' });
    return res.json({ user, token, photos });

  } catch (error) {
    next({
      status: 500,
      message: 'Internal Server Error'
    });
  };
};

exports.logout = (req, res, next) => {

};
