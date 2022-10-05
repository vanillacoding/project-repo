require("dotenv").config();

const express = require("express");
const path = require("path");
const logger = require("morgan");

const db = require("./config/db");
const auth = require("./routes/auth");
const user = require("./routes/user");
const course = require("./routes/course");
const site = require("./routes/site");
const deserialize = require("./middlewares/deserialize");
const errorHandler = require("./middlewares/errorHandler");

const AppError = require("./utils/AppError");

const app = express();

db.init();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(deserialize);

app.use("/auth", auth);
app.use("/user", user);
app.use("/course", course);
app.use("/site", site);

app.use((req, res, next) => {
  next(new AppError("잘못된 주소입니다.", 404));
});

app.use(errorHandler);

module.exports = app;
