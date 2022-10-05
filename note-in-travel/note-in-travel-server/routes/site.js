const router = require("express").Router();

const authenticateUser = require("../middlewares/authenticateUser");
const siteController = require("../controllers/siteController");

router
  .route("/")
  .post(authenticateUser, siteController.addSite);

module.exports = router;
