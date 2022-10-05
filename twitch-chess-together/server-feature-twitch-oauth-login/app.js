require('dotenv').config();
require('./database/connection')();
const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const loaders = require('./loaders');

const errorHandler = require('./middlewares/errorHandler');

const loginRouter = require('./routes/login');
const gameRouter = require('./routes/game');
const rootRouter = require('./routes/root');

const ERROR = require('./constants/error');

const app = express();

loaders(app, express);

app.use(
  cors({
    origin: `${process.env.MY_CLIENT_URL}`,
    credentials: true,
  })
);

app.use('/', rootRouter);
app.use('/login', loginRouter);
app.use('/game', gameRouter);

app.use((req, res, next) => {
  next(createError(404, ERROR.PAGE_NOT_FOUND));
});

app.use(errorHandler);

module.exports = app;
