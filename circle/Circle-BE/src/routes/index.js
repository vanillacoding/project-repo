/* eslint-disable max-len */
const express = require("express");

const router = express.Router();

const authRoute = require("./auth.route");
const projectRoute = require("./project.route");
const serviceRoute = require("./service.route");

const setResponseHeader = require("./middlewares/setResponseHeader");
const verifyToken = require("./middlewares/verifyToken");
const setResponseServiceHeader = require("./middlewares/setResponseServiceHeader");

router.use("/projects", setResponseServiceHeader, serviceRoute);
router.use(setResponseHeader);
router.use("/auth", authRoute);
router.use("/projects", verifyToken, projectRoute);

module.exports = router;
