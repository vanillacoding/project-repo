const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const createError = require("http-errors");
const initLoader = require("./loaders");

initLoader(app);

const index = require("./routes/index");

app.use("/api", index);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.error(err);

  err.status
    ? res.status(err.status).json({ result: "fail", message: err.message })
    : res.status(500).json({ result: "fail", message: "Internal server error" });
});

module.exports = app;
