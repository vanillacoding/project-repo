const express = require("express");
const router = express.Router();
const mealController = require("../controller/meal");

router.get("/", mealController.getMeal);

router.post("/", mealController.postMeal);

router.get("/:id", mealController.getMealDetail);

router.patch("/:id", mealController.patchMealDetail);

router.delete("/:id", mealController.deleteMealDetail);

module.exports = router;
