const mongoose = require("mongoose");

const SchedulesSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    done: {
      type: Boolean,
    },
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    start: {
      date: {
        type: Date,
      },
      dateTime: {
        type: Date,
      },
      timeZone: {
        type: String,
      },
    },
    end: {
      date: {
        type: Date,
      },
      dateTime: {
        type: Date,
      },
      timeZone: {
        type: String,
      },
    },
    isAllDay: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Schedules", SchedulesSchema);
