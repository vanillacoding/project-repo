const ERROR = require('../constants/error');

const errorHandler = (err, req, res, _) => {
  if (!err.status) {
    res.locals.message = ERROR.INTERNAL_SERVER_ERROR;
  } else {
    res.locals.message = err.message;
  }

  res.locals.error = req.app.get('env') === 'development' ? err : {};

  const message =
    req.app.get('env') === 'development'
      ? res.locals.message
      : ERROR.INTERNAL_SERVER_ERROR;

  res.status(err.status || 500).json({
    error: message,
  });
};

module.exports = errorHandler;
