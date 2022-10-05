require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const connectMongoDB = require("./loader/database");

const gameRouter = require("./routes/game");
const reviewRouter = require("./routes/review");

const app = express();

if (process.env.NODE_ENV !== "test") {
  connectMongoDB();
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));

app.use("/game", gameRouter);
app.use("/review", reviewRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).send(err.message);
});

module.exports = app;
