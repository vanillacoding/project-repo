require('dotenv').config();
require('./config/db');

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors());

const userRouter = require('./routes/user');
const usersRouter = require('./routes/users');
const photoRouter = require('./routes/photo');

const { errorMessage } = './constants/errorMessage';
const statusMessage = require('./constants/statusMessage');

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/health-check', function (req, res, next) {
  res.json({
    status: 'ok'
  });
});
app.use('/user', userRouter);
app.use('/users', usersRouter);
app.use('/photo', photoRouter);

app.use(function(req, res, next) {
  next(createError(404), errorMessage.invalidUrl);
});

app.use(function(err, req, res, next) {
  res.locals.errorMessage = err.message || 'Internal Server Error';
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  const { status, message } = err;

  res.status(status || 500);
  res.json({
    result: statusMessage.fail,
    message: message
  });
});

module.exports = app;
