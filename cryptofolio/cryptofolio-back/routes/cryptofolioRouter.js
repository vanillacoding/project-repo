const express = require("express");
const router = express.Router();
const {
  getCryptoFoliosDB,
  createCryptoFolioDB,
  deleteCryptoFolioDB,
} = require("./controllers/cryptofolioController");

router.route("/").get(getCryptoFoliosDB);
router.route("/new").post(createCryptoFolioDB);
router.route("/delete").delete(deleteCryptoFolioDB);

module.exports = router;
