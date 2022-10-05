require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const timeout = require('connect-timeout');

const loaders = require('./loaders');

const repository = require('./routes/repository');
const ERROR = require('./constants/error');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

loaders(app, express);

app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
  })
);

const haltOnTimedout = (req, res, next) => {
  if (!req.timedout) next();
};

app.use(timeout('4s'));
app.use(haltOnTimedout);

app.use('/repository', repository);

app.use((req, res, next) => {
  next(createError(404, ERROR.PAGE_NOT_FOUND));
});

app.use(errorHandler);

module.exports = app;
