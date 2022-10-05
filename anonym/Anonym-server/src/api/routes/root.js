const express = require("express");
const StremingController = require("../controllers/streaming");
const UserController = require("../controllers/user");

const router = express.Router();

const root = (app) => {
  app.use("/", router);

  router.get("/", StremingController.getStreamings);
  router.get("/search", UserController.searchUsers);
};

module.exports = root;
