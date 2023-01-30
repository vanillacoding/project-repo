const express = require("express");

const router = express.Router();

const verifyToken = require("./middlewares/verifyToken");
const createSessionCookie = require("./middlewares/createSessionCookie");
const userController = require("./controllers/auth.controller");

router
  .route("/users")
  .get(verifyToken, userController.getUser)
  .post(createSessionCookie, userController.findOrCreateUser);

router.route("/logout").post(verifyToken, userController.deleteSessionCookie);

module.exports = router;
