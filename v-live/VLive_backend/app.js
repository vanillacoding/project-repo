const express = require('express');
const initialLoaders = require('./loader');

const index = require('./routes');
const episode = require('./routes/episode');
const channel = require('./routes/channel');
const chat = require('./routes/chat');

const { NotFoundError } = require('./lib/errors');
const { ROUTES } = require('./constants/routes');

const app = express();

initialLoaders(app);

app.use(ROUTES.INDEX, index);
app.use(ROUTES.EPISODE, episode);
app.use(ROUTES.CHANNEL, channel);
app.use(ROUTES.CHAT, chat);

app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use((err, req, res, _) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({
    result: 'error',
    message: err.message,
  });
});

module.exports = app;
