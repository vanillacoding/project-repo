const cors = require("cors");
const logger = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");

const initLoaders = (app) => {
  app.use(
    cors({
      origin: process.env.ORIGIN_URI_PROD,
      credentials: true,
    })
  );

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
};

module.exports = initLoaders;
