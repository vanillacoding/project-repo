const { RES_RESULT } = require('../../constants');

exports.sendUserInfo = (req, res, next) => {
  const { user } = res.locals;
  res.json({ result: RES_RESULT.OK, data: { user }});
};
