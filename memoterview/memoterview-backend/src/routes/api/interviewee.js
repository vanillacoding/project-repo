const express = require("express");

const router = express.Router();

const { updateIntervieweeQuestion } = require("../../services/intervieweeService");
const { intervieweeQuestionSchema } = require("../../utils/validationSchema");
const validate = require("../middlewares/validate");

router.patch(
  "/:interviewee_id/answer",
  validate(intervieweeQuestionSchema, "body"),
  async (req, res, next) => {
    try {
      const { projectId, intervieweeId, question } = req.body;

      await updateIntervieweeQuestion({ projectId, intervieweeId, question });

      return res.json({ result: "ok" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
