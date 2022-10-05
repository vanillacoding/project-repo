const router = require("express").Router();

const authenticateUser = require("../middlewares/authenticateUser");
const courseController = require("../controllers/courseController");
const verifyParams = require("../middlewares/verifyParams");

router
  .route("/")
  .post(authenticateUser, courseController.addCourse)
  .get(authenticateUser, courseController.getCourses);

router
  .route("/:courseId")
  .post(authenticateUser, verifyParams, courseController.saveMessage)
  .get(authenticateUser, verifyParams, courseController.getCourseById);

module.exports = router;
