const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const { tokenSecretKey } = require('../../configs');

const User = require('../../models/User');
const { InvalidDataError, VliveError } = require('../../lib/errors');

exports.login = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const token = jwt.sign(userInfo, tokenSecretKey);
    let user = await User.findOne(userInfo);

    if (user == null) {
      user = await User.create(userInfo);
    }

    res.json({
      result: 'ok',
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new InvalidDataError());
    }

    next(new VliveError());
  }
};
