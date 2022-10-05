const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const { getMedicine, getMedicines } = require("../controllers/medicine.controller");

router.get("/", verifyToken, getMedicines);

router.get("/medicine", verifyToken, getMedicine);

module.exports = router;
