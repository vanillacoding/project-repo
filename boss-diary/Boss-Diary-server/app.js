const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const DB_URL = process.env.NODE_ENV === 'test'
  ? process.env.TEST_DATABASE_URL
  : process.env.DATABASE_URL;

const mongoose = require('mongoose');
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', console.log.bind(console, 'connected'));
db.on('error', console.error.bind(console, 'connection error'));

const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(express.json({ limit: 5000000 }));
app.use(express.urlencoded({ extended: true, limit: 5000000 }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false
  }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/api'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ result: 'err' });
});

module.exports = app;
