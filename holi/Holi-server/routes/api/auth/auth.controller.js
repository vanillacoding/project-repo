const jwt = require('jsonwebtoken');
const User = require('../../../models/User');
const { LoginError } = require('../../../lib/errors');

/* 
  POST /api/auth/login 
*/

exports.login = async (req, res, next) => {
  try {
    const secret = req.app.get('jwt-secret');
    const user = await User.findOneByEmail({ email: req.body.email });
    const userData = await confirmAndSave(user);
    const accessToken = await login(userData);
    respond(accessToken);

    function confirmAndSave(user) {
      return user || User.createUser(req.body);
    }

    function login(userData) {
      const { _id, email, name } = userData;

      return new Promise((resolve, reject) => {
        jwt.sign(
          { _id, email, name },
          secret,
          { expiresIn: '7d', issuer: 'davinjeong', subject: 'userInfo' },
          (err, token) => (err ? reject(err) : resolve(token))
        );
      });
    }

    function respond(token) {
      const { _id, email, picture_url: pictureUrl, name } = userData;

      res.status(201).json({
        id: _id,
        email,
        pictureUrl,
        name,
        token
      });
    }
  } catch (err) {
    return next(new LoginError());
  }
};
