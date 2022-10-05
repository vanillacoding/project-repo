const jwt = require('jsonwebtoken');
const User = require('../../../models/User');
require('dotenv').config();

exports.ensureLoggedIn = async (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) throw 'Invalid token';

    const bearerToken = bearerHeader.split(' ')[1];
    const userData = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    const user = await User.findOne(
      { _id: userData._id },
      '_id name email profile_photo templates points'
    );

    res.locals.userData = user;
    next();
  } catch(err) {
    next(new Error(err));
  }
};
