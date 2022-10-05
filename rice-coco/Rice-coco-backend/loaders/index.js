const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const initLoaders = app => {
  app.set('views', path.join(__dirname, '/../views'));
  app.set('view engine', 'pug');

  app.use(cors());
  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '/../public')));
};

module.exports = initLoaders;
