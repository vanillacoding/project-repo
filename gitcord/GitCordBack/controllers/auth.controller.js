module.exports.checkUser = async (req, res, next) => {
  const {
    user,
    accessToken
  } = req;

  res.json({
    message: null,
    accessToken,
    user
  });
};
