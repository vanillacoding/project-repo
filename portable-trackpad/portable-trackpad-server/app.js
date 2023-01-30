const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const db = require("./config/db");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const localIpRouter = require("./routes/localIp");
const app = express();
const ERROR = require("./constants/error");

db();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRouter);
app.use("/users", userRouter);
app.use("/localIps", localIpRouter);

app.use((req, res, next) => {
  next(createError(404, ERROR.NOT_FOUND));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({
    message: ERROR.INTERNAL_SERVER_ERROR,
  });
});

module.exports = app;
