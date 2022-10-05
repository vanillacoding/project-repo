require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const cors = require('cors');

const dbLoader = require('./loader/db');
const mazeRouter = require('./routes/maze');
const ERROR = require('./constant/error');

const app = express();

app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true,
  }),
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

dbLoader();

app.use('/maze', mazeRouter);

app.use((req, res, next) => {
  next(createError(404, 'ERROR'));
});

app.use((err, req, res, next) => {
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
    result: 'error',
    message,
  });
});

module.exports = app;
