const Question = require("../models/Question");

exports.getQuestions = async ({ category }) => {
  try {
    const categorizedQuestions = await Question.aggregate(
      [
        { $match: { category } },
        { $sample: { size: 5 } },
        { $project: { "title": 1 } },
      ]
    );

    return categorizedQuestions;
  } catch (error) {
    return { getQuestionError: error };
  }
};
