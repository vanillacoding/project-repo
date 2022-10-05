require('dotenv').config();

const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const dbInit = require('./loaders/db');

const app = express();

app.use(logger('dev'));
app.use(cors({
  origin: true,
  credentials: true,
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

dbInit();

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.error(err);
  res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  err.status = err.status || 500;
  res.json({ ok: false, error: err});
});

module.exports = app;
