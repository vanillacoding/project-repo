const express = require("express");
const router = express.Router();

const verifyToken = require("./middlewares/verifyToken");

const {
  verifyUserData,
  registerUser,
  logout,
  getNotification,
  getFollowingUsers,
  handleFollowData,
  getUserData,
  updateUserData,
  checkNotification,
} = require("./controllers/users.controllers");

router.post("/check-member", verifyUserData);

router.post("/register", registerUser);

router.get("/logout", logout);

router.get("/notification", verifyToken, getNotification);

router.get("/following/:id", getFollowingUsers);

router.patch("/follower/:id", handleFollowData);

router.get("/:id", getUserData);

router.patch("/:id", verifyToken, updateUserData);

router.patch("/notification/read", verifyToken, checkNotification);

module.exports = router;
