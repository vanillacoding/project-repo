require('dotenv').config();
require('./loaders/mongoose');

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const parser = require('cookie-parser');

const indexRouter = require('./routes/index');

const app = express();

app.use(parser());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: false }));

app.use('/', indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json({
    code: err.status,
    message: err.message ? err.message : 'Internal server error',
  });
});

module.exports = app;
