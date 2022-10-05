require("dotenv").config();
require("./loader/registerSchedule");

const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/users");
const gameRouter = require("./routes/games");

const connectMongoDB = require("./loader/connectMongoDB");

connectMongoDB();

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));

app.use("/users", usersRouter);
app.use("/games", gameRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);

  res.json({ result: "failure" });
});

module.exports = app;
