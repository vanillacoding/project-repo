const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const favicon = require("serve-favicon");
const path = require("path");

const createError = require("http-errors");
const cookieParser = require("cookie-parser");

module.exports  = function ({ app, routerLoader }) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

  app.use(cookieParser());
  app.use(compression());
  app.use(helmet());

  routerLoader({ app });

  app.use(function (req, res, next) {
    next(createError(404));
  });


  app.use(function (err, req, res) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500).json({ result: "error", "errMessage": err.message });
  });
};
