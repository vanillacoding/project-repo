require('dotenv').config();
require('./config/db');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV !== 'production'
    ? process.env.ORIGIN_URI_DEV
    : process.env.ORIGIN_URI_PROD,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(logger('dev'));
app.use(express.json({
  limit: '5mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health-check', function (req, res, next) {
  res.json({
    status: 'ok'
  });
});

app.use('/', indexRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(err);
  res.status(err.status || 500);
  res.json({ errMessage: 'Internal Server Error'});
});

module.exports = app;
