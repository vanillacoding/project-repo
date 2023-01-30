const mongoose = require("mongoose");

const pptSlideSchema = new mongoose.Schema(
  {
    data: { type: Object, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

pptSlideSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model("PptSlide", pptSlideSchema);
