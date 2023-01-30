const admin = require('../../configs/firebaseConfig');

const auth = async (req, res, next) => {
  try {
    if (!req.headers || typeof req.headers.authorization !== 'string') {
      throw new Error('Invalid token delivered!!');
    }

    const token = req.headers.authorization.split(' ')[1];

    const decodeValue = await admin.auth().verifyIdToken(token);

    if (!decodeValue) {
      throw new Error('Authentication Error');
    }

    req.user = decodeValue;

    next();
  } catch (error) {
    error.message = `Error in auth in authMiddleware.js : ${error.message}`;
    error.status = 401;

    next(error);
  }
};

module.exports = auth;
