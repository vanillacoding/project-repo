require('dotenv').config();
require('./config/database');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { NotFoundError } = require('./lib/errors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', require('./routes/api'));

app.set('jwt-secret', process.env.JWT_SECRET_KEY);

app.use(function (req, res, next) {
  next(new NotFoundError());
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  const { status, message } = err;

  res.status(status || 500);
  res.json({ message });
});

module.exports = app;
