const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");

router.get("/", reviewController.getReivews);
router.post("/", reviewController.postReview);

module.exports = router;
