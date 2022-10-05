require("dotenv").config();
require("./config/db");

const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const app = express();

const setAccessLevel = require("./routes/middleware/setAccessLevel");
const verifyCustomCategory = require("./routes/middleware/verifyCustomCategory");
const auth = require("./routes/api/auth");
const condition = require("./routes/api/condition");
const meal = require("./routes/api/meal");
const sleep = require("./routes/api/sleep");
const activity = require("./routes/api/activity");
const customGrid = require("./routes/api/customGrid");
const customAlbum = require("./routes/api/customAlbum");
const comment = require("./routes/api/comment");
const preference = require("./routes/api/preference");
const friend = require("./routes/api/friend");
const googleFit = require("./routes/api/googleFit");
const { handleNotFound, handleDefaultError } = require("./errorHandler");

const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));

app.use("/", auth);
app.use("/:creatorId/", setAccessLevel, condition);
app.use(/.*\/meal/, meal);
app.use(/.*\/activity/, activity);
app.use(/.*\/sleep/, sleep);
app.use(/.*\/preference/, preference);
app.use(/.*\/friend/, friend);
app.use(/.*\/googleFit/, googleFit);
app.use("/:creatorId/:category/:ratingId/comment", comment);
app.use("/:creatorId/:category", verifyCustomCategory, customGrid, customAlbum);

app.use(handleNotFound);
app.use(handleDefaultError);

module.exports = app;
