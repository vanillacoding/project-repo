const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");

const { corsOptions } = require("../configs");
const dbLoader = require("./db");

const initLoaders = app => {
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  dbLoader();
};

module.exports = initLoaders;
