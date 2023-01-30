const logger = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

module.exports = (app) => {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cors());
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "ejs");
};
