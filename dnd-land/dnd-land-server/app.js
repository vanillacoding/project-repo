const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const createError = require("http-errors");
const app = express();

const initLoader = require("./loaders");
const connectMongoDB = require("./loaders/db");

const index = require("./routes/index");

initLoader(app);
connectMongoDB();

app.get("/", (req, res) => {
  res.status(200).json({ result: "success" });
});

app.use("/api", index);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use((err, req, res) => {
  console.error(err);

  err.status
    ? res.status(err.status).json({ result: "failure", message: err.message })
    : res.status(500).json({ result: "failure", message: "Internal server error" });
});

module.exports = app;
