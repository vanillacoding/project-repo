const cors = require("cors");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const express = require("express");

module.exports = ({ app, routerLoader }) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors());

  routerLoader({ app });
  
  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500).json({ result: "error", "errMessage": err.message });
  });
};
