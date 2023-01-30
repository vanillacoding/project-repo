const mongoose = require("mongoose");

const pptSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    slideWidth: { type: Number, default: 1280 },
    slideHeight: { type: Number, default: 720 },
    downloadUrl: { type: String },
    slideOrderList: { type: Array },
    slides: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PptSlide",
      },
    ],
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

pptSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model("Ppt", pptSchema);
