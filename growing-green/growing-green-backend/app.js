const express = require('express');
const initialLoaders = require('./loader');
const path = require('path');
const logger = require('morgan');

const { NotFoundError } = require('./lib/errors');
const httpStatusCodes = require('./lib/httpStatusCodes');
const { ERROR_MESSAGES } = require('./constants');

const usersRouter = require('./routes/users');
const plantsRouter = require('./routes/plants');
const searchRouter = require('./routes/search');

const app = express();

initialLoaders(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/plants', plantsRouter);
app.use('/search', searchRouter);
app.use('/', (req, res) => {
  res.send('connect');
});

app.use(function (req, res, next) {
  next(new NotFoundError(req.url));
});

// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  console.error(err);

  const statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER;

  res.status(statusCode).json({
    result: 'error',
    message: err.message || ERROR_MESSAGES.INTERNAL_SERVER,
  });
});

module.exports = app;
