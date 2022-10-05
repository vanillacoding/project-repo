const cors = require("cors");
const logger = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");

function initLoaders(app) {
  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN_URI_PROD,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
}

module.exports = initLoaders;
