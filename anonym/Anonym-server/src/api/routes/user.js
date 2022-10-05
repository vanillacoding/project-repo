const express = require("express");
const UserController = require("../controllers/user");

const router = express.Router();

const user = (app) => {
  app.use("/user", router);

  router.put("/userName/:id", UserController.updateUserName);
  router.put("/userThumnail/:id", UserController.updateUserThumnail);
  router.put("/follow/:id", UserController.followUser);
  router.put("/unfollow/:id", UserController.unfollowUser);
};

module.exports = user;
