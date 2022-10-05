require('./db');

const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const groupsRouter = require('./routes/groups');
const roomsRouter = require('./routes/rooms');

const { NODE_ENV } = require('./config');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 개발시에는 'dev', 배포시에는 'combined'
app.use((req, res, next) => {
  if (NODE_ENV === 'production') {
    morgan('combined')(req, res, next);
  } else {
    morgan('dev')(req, res, next);
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true
}));

//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);
app.use('/rooms', roomsRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
