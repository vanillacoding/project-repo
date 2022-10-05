require("dotenv").config();

const express = require("express");
const path = require("path");
const logger = require("morgan");

require("./config/db");

const handleError = require("./middlewares/handleError");
const invalidUrlError = require("./middlewares/invalidUrlError");

const usersRouter = require("./routes/users");
const pinsRouter = require("./routes/pins");

const app = express();

const nodeSchedule = require("./config/node-schedule");
nodeSchedule();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ message: "success" });
});
app.use("/users", usersRouter);
app.use("/pins", pinsRouter);

app.use(invalidUrlError);
app.use(handleError);

module.exports = app;
