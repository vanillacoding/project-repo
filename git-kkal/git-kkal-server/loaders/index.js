const logger = require('morgan');

module.exports = (app, express) => {
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};
