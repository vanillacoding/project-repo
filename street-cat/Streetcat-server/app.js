require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/user');
const catRouter = require('./routes/cat');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')

mongoose.connect(
  process.env.DB_URI, 
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, 
  () => {
    console.log('connected to mongodb');
  }
);

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use('/auth', authRouter);
app.use('/user', usersRouter);
app.use('/cat', catRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ result : 'error' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`connected to port ${process.env.PORT}`);
});

module.exports = app;
