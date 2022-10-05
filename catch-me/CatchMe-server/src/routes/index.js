const express = require("express");
const router = express.Router();

const User = require("../models/user");
const validate = require("./middlewares/validate");
const { recordBodySchema, idParamsSchema } = require("../utils/validationSchema");

router.post(
  "/api/result/:id",
  validate(idParamsSchema, "params"),
  validate(recordBodySchema, "body"),
  async (req, res, next) => {
    try {
      const { score, username } = req.body;

      const newUser = User({
        score,
        username,
      });

      await newUser.save();

      return res.json({ result: "ok" });
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/api/result",
  async (req, res, next) => {
    try {
      const records = await User.find({})
        .sort({ "score": -1 })
        .limit(7);
      
      return res.json({ data: records, result: "ok" });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = (app) => {
  app.use("/", router);
};
