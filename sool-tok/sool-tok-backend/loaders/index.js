const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const dbLoader = require('./db');
const { corsOptions } = require('../configs');

const initLoaders = app => {
  if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
  }

  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(cookieParser());

  dbLoader();
};

module.exports = initLoaders;
