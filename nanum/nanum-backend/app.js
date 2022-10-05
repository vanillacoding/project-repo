require('dotenv').config();
require('./loaders/mongoose');

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const statuses = require('statuses');

const { AUTH } = require('./constants/index');

const app = express();

app.use(logger('dev'));
app.use(cors({ exposedHeaders: AUTH.HEADER }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('./routes'));

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    code: err.status,
    message: err.message !== statuses[err.status]
      ? err.message
      : statuses[err.status],
  });
});

module.exports = app;
