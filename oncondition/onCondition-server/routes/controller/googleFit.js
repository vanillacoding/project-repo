const createError = require("http-errors");

const {
  getGoogleFitSessionData,
  getGoogleFitStepData,
  updateModels,
} = require("../services/googleFit");
const ACCESS_LEVELS = require("../../constants/accessLevels");
const { ERROR } = require("../../constants/messages");
const { OK, UNAUTHORIZED } = require("../../constants/statusCodes");

async function postGoogleToken(req, res, next) {
  const { googleAccessToken } = req.body;

  try {
    if (req.accessLevel !== ACCESS_LEVELS.CREATOR) {
      throw createError(UNAUTHORIZED);
    }

    if (!googleAccessToken) {
      return next(createError(UNAUTHORIZED, ERROR.INVALID_TOKEN));
    }

    const { activities, sleeps } = await getGoogleFitSessionData(
      googleAccessToken,
    );

    try {
      const steps = await getGoogleFitStepData(googleAccessToken);

      await updateModels({ activities, sleeps, steps }, req.creator.id);

      res.status(OK);
      res.json({ result: "ok" });
    } catch (err) {
      if (err.message === ERROR.STEP_DATA_NOT_AVAILABLE) {
        await updateModels({ activities, sleeps }, req.creator.id);

        res.status(OK);
        res.json({ result: "No Step Data" });
      }
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  postGoogleToken,
};
