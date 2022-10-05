const historyService = require("../services/history.service");

exports.updateDoseHistory = async (req, res, next) => {
  try {
    const doseHistory = req.body;
    const { doseHistoryId } = req.params;

    await historyService.updateHistory(doseHistoryId, doseHistory);

    res.status(200).json({ result: "success" });
  } catch (error) {
    next(error);
  }
};
