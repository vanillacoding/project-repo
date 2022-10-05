const jwt = require('jsonwebtoken');
const User = require('../../../models/User');
const { NotFoundError } = require('../../../lib/errors');

/*
  POST /api/auth/login
*/

exports.login = async (req, res, next) => {
  try {
    const { facebookId, userName } = req.body;
    const secret = req.app.get('jwt-secret');

    const checkAndRegister = user => {
      return user ? user : register();
    };

    const register = () => {
      const newUser = new User({
        facebookId,
        userName,
        myPhotos: [],
        receivedPhotos: []
      });
      return newUser.save();
    };

    const login = userData => {
      const { _id, facebookId, userName } = userData;
      return new Promise((resolve, reject) => {
        jwt.sign(
          {
            _id,
            facebookId,
            userName
          },
          secret,
          {
            expiresIn: '7d',
            issuer: 'choinashil',
            subject: 'userInfo'
          }, (err, token) => {
            const result = { token, _id }
            err ? reject(err) : resolve(result);
          }
        );
      });
    };

    const respond = result => {
      const { token, _id } = result;
      res.json({
        message: 'logged in successfully',
        access_token: token,
        userId: _id,
        userName
      });
    };

    const user = await User.findOneByFacebookId(facebookId);
    const userData = await checkAndRegister(user);
    const accessToken = await login(userData);
    respond(accessToken);

  } catch(err) {
    const { name, message } = err;
    next(new NotFoundError(name, message));
  }
};


/*
  GET /api/auth/check
*/

exports.check = async (req, res) => {
  const { _id, userName } = res.locals.userData;

  res.json({
    success: true,
    userId: _id,
    userName
  });
};
