const express = require("express");
const router = express.Router();
const {
  getDataDB,
  updateMetaDataDB,
  updatePriceDB,
} = require("./controllers/coinController");

router.route("/").get(getDataDB);
router.route("/metadata").get(updateMetaDataDB);
router.route("/price").get(updatePriceDB);

module.exports = router;
