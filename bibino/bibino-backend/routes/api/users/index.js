const router = require("express").Router();

const { signInUser, getUser, getUserRecommendations } = require("./controller");
const authorizeUser = require("../../../middlewares/authorizeUser");

router.route("/sign-in").post(signInUser);

router.all("*", authorizeUser);

router.route("/:userId").get(getUser);

router.route("/:userId/recommendations").get(getUserRecommendations);

module.exports = router;
