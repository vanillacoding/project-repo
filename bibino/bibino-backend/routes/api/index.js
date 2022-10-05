const router = require("express").Router();
const authorizeUser = require("../../middlewares/authorizeUser");

const users = require("./users");
const beers = require("./beers");
const reviews = require("./reviews");

router.use("/users", users);
router.all("*", authorizeUser);
router.use("/beers", beers);
router.use("/reviews", reviews);

module.exports = router;
