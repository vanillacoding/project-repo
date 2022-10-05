const express = require("express");
const logger = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");

const app = express();
require("./config/database");
require("./config/aws");
require("./config/auth");

const api = require("./routes/api");
const handleGlobalError = require("./middlewares/handleGlobalError");

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());

app.use("/api", api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, `Can't find ${req.originalUrl} on this server`));
});

// error handler
app.use(handleGlobalError);

module.exports = app;
