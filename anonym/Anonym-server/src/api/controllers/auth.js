const AuthService = require("../../services/auth");

exports.login = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const { status, message, user, token } = await AuthService.login(userInfo);

    res.cookie("jwt", token);
    res.status(status).json({
      message,
      payload: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { status, message } = AuthService.logout();

    res.clearCookie("jwt");
    res.status(status).json({
      message,
    });
  } catch (err) {
    next(err);
  }
};

exports.checkAuth = async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authentication;
    const { status, message, user } = await AuthService.checkAuth(bearerHeader);

    if (!user) {
      res.status(status).json({
        message,
      });

      return;
    }

    res.status(status).json({
      message,
      payload: user,
    });
  } catch (err) {
    next(err);
  }
};
