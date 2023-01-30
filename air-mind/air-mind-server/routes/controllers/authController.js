const User = require('../../models/User');

const login = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('No user data delivered!!');
    }

    const { name, email, picture } = req.user;
    const foundeduser = await User.findOne({ email }).lean();

    const responseBody = {};

    if (!foundeduser) {
      const newUser = await User.create({
        userName: name,
        email,
        profile: picture,
      });

      responseBody.result = 'ok';
      responseBody.user = newUser;
      res.status(201).json(responseBody);
      return;
    }

    responseBody.result = 'ok';
    responseBody.user = foundeduser;

    res.status(201).json(responseBody);
  } catch (error) {
    error.message = `Error in login in authController.js : ${error.message}`;

    next(error);
  }
};

module.exports = {
  login,
};
