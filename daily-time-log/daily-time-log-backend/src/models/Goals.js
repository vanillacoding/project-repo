const mongoose = require("mongoose");

const GoalsSchema = new mongoose.Schema(
  {
    milestone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Milestones",
      required: true,
    },
    start: {
      dateTime: {
        type: String,
      },
      timezone: {
        type: String,
      },
    },
    end: {
      dateTime: {
        type: String,
      },
      timezone: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Goals", GoalsSchema);
