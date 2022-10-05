const dotenv = require("dotenv");
dotenv.config();

const logger = require("morgan");
const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const notificationRouter = require("./routes/notification");

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "success" });
});

app.use("/notification", notificationRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
});

module.exports = app;
