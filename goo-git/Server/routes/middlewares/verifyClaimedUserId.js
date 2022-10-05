const createError = require('http-errors');

const verifyClaimedUserId = async (req, res, next) => {
  if (
    req.params.user_id
    !== res.locals.decodedUserId.toString()
  ) {
    next(createError(400, 'decoded user id and claimed user id do not match'));
  }

  next();
};

module.exports = verifyClaimedUserId;
