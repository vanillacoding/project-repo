const admin = require('../../configs/firebaseConfig');

const authWithoutError = async (req, res, next) => {
  if (req.headers && typeof req.headers.authorization === 'string') {
    const tokenString = req.headers.authorization.split(' ');
    if (tokenString.length > 1) {
      const token = tokenString[1];

      try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (!decodeValue) {
          next();
        }

        req.user = decodeValue;
      } catch (error) {
        next();
      }
    }
  }

  next();
};

module.exports = authWithoutError;
