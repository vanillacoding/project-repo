const router = require("express").Router();

const userController = require("../controllers/userController");
const authenticateUser = require("../middlewares/authenticateUser");

router
  .route("/")
  .get(authenticateUser, userController.getUser);

router
  .route("/favoriteCourses/:courseId")
  .patch(authenticateUser, userController.addFavoriteCourse)
  .delete(authenticateUser, userController.deleteFavoriteCourse);

router
  .route("/favoriteSites/:siteId")
  .patch(authenticateUser, userController.addFavoriteSite)
  .delete(authenticateUser, userController.deleteFavoriteSite);

module.exports = router;
