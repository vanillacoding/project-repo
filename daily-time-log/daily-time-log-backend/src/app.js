require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const schedulesRouter = require("./routes/schedules");
const milestonesRouter = require("./routes/milestones");
const goalsRouter = require("./routes/goals");

const { errorHandler } = require("./middlewares/error");

const app = express();

require("./database/connection");

app.use(logger("dev"));
app.use(cors({ origin: ["http://localhost:3000", "https://www.daily-time-log.xyz"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/schedules", schedulesRouter);
app.use("/milestones", milestonesRouter);
app.use("/goals", goalsRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use(errorHandler);

module.exports = app;
