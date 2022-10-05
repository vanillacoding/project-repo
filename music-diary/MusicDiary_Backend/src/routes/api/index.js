const express = require("express");
const router = express.Router();

const usersRouter = require("../api/users/");
const authUser = require("../middlewares/authUser");

router.use("/api/users", usersRouter);
// router.all("*", authUser);

module.exports = router;
