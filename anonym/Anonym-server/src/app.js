require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createError = require("http-errors");
const helmet = require("helmet");
const loggerLoader = require("./loaders/logger");
const setRoutes = require("./api");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

loggerLoader(app);
setRoutes(app);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.log(err);
  res.status(err.status || 500).json({
    result: "error",
  });
});

module.exports = app;
