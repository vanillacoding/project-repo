require("dotenv").config();
require("./db");

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const createHttpError = require("./utils/createHttpError");
const { verifyIdToken } = require("./middlewares/auth/verifyIdToken");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const glossariesRouter = require("./routes/glossaries");
const translationsRouter = require("./routes/translations");
const wordsRouter = require("./routes/words");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.use("/", indexRouter);
app.use(verifyIdToken);
app.use("/users", usersRouter);
app.use("/glossaries", glossariesRouter);
app.use("/translations", translationsRouter);
app.use("/words", wordsRouter);

app.use((req, res, next) => {
  next(createHttpError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
