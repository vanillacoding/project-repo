const cors = require("cors");
const logger = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");

const connectMongoDB = require("../config/db");

const initLoaders = (app) => {
  app.use(
    cors({
      origin: process.env.ORIGIN_URI_DEV,
      credentials: true,
    })
  );

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

  connectMongoDB();
};

module.exports = initLoaders;
