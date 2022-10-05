const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');

const { ROUTE } = require('./configs/constants');

const initLoaders = require('./loaders');
const usersRouter = require('./routes/users');

const app = express();

initLoaders(app);

app.use(ROUTE.USERS, usersRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.log(err);

  if (process.env.NODE_ENV === 'production') {
    if (err instanceof mongoose.Error) err = createError(500);
    err.stack = null;
  }

  res.status(err.status || 500);
  res.json(err);
});

let server;

if (process.env.NODE_ENV === 'development') {
  const https = require('https');
  const fs = require('fs');

  const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'stst',
    requestCert: false,
    rejectUnauthorized: false,
  };

  server = https.createServer(options, app).listen(443, function () {
    console.log('Https server listening');
  });
} else {
  server = app.listen(process.env.PORT || 8080, () => {
    console.log('server listening');
  });
}

require('./configs/socket').init(server);
require('./lib/socketHandler');
