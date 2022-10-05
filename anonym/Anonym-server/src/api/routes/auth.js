const express = require("express");
const AuthController = require("../controllers/auth");

const router = express.Router();

const auth = (app) => {
  app.use("/auth", router);

  router.post("/check", AuthController.checkAuth);
  router.post("/login", AuthController.login);
  router.get("/logout", AuthController.logout);
};

module.exports = auth;
