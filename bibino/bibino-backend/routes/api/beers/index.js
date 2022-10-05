const router = require("express").Router();

const {
  getBeerRankings,
  searchBeer,
  getBeer,
  getBeerComments,
  getBeerRecommendations,
  scanPhoto,
} = require("./controller");

router.route("/rankings").get(getBeerRankings);

router.route("/scan").post(scanPhoto);

router.route("/search").get(searchBeer);

router.route("/:beerId").get(getBeer);

router.route("/:beerId/comments").get(getBeerComments);

router.route("/:beerId/recommendations").get(getBeerRecommendations);

module.exports = router;
