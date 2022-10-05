require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const db = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Database connection successful 👍🏻"))
  .catch(err => console.log(err));

const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const battleRouter = require("./routes/battle")

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
  httpOnly: false,
}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/battle", battleRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({
    result: false,
    message: err.message,
  });
});

module.exports = app;
