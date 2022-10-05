const express = require("express");
const { IamTokenManager } = require("ibm-watson/auth");

const router = express.Router();

const serviceUrl = process.env.SPEECH_TO_TEXT_URL;

const tokenManager = new IamTokenManager({
  apikey: process.env.SPEECH_TO_TEXT_IAM_APIKEY || "<iam_apikey>",
});

router.get("/credentials", async (req, res, next) => {
  try {
    const accessToken = await tokenManager.getToken();
    res.json({
      accessToken,
      serviceUrl,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
