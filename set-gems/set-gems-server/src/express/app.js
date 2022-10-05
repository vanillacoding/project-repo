require("dotenv").config();
require("./config/db");

const logger = require("morgan");
const express = require("express");
const app = express();
const cors = require("cors");

const ranking = require("./routes/ranking");
const { handleNotFound, handleDefaultError } = require("./errorHandlers");
const { OK } = require("../constants/statusCodes");

const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: OK,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());

app.use("/ranking", ranking);

app.use(handleNotFound);
app.use(handleDefaultError);

module.exports = app;
