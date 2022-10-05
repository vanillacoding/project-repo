const express = require("express");
const StreamingController = require("../controllers/streaming");

const router = express.Router();

const streaming = (app) => {
  app.use("/streaming", router);

  router.post("/:id", StreamingController.generateStreaming);
  router.delete("/:id", StreamingController.removeStreaming);
};

module.exports = streaming;
