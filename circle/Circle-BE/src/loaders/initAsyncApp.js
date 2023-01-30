const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");

const logger = require("../../libs/logger");
const loadDatabase = require("./database");
const indexRouter = require("../routes/index");

const { MESSAGE } = require("../constants");

const initAsyncApp = async (app) => {
  logger.info("app start");

  await loadDatabase();

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/", indexRouter);

  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use((err, req, res, next) => {
    logger.error(err.stack);

    const error = process.env.NODE_ENV === "development" || err.status
      ? err
      : new Error(MESSAGE.INTERNAL_SERVER_ERROR);

    res.status(err.status || 500).json({ message: error.message });
  });

  return app;
};

module.exports = initAsyncApp;
