const express = require("express");

const router = express.Router();

const { getQuestions } = require("../../services/questionService");

const { categorySchema } = require("../../utils/validationSchema");

const validate = require("../middlewares/validate");

router.get(
  "/:category",
  validate(categorySchema, "params"),
  async (req, res, next) => {
    try {
      const { category } = req.params;

      const questions = await getQuestions({ category });

      return res.json({ data: questions });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
