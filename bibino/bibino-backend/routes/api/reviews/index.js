const router = require("express").Router();

const { createReview, getReview, updateReview } = require("./controller");

router.route("/new").post(createReview);

router.route("/:reviewId").get(getReview).put(updateReview);

module.exports = router;
