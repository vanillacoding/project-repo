const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    commenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interviewer",
    },
  },
  { _id: false }
);

const intervieweeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    interviewDate: {
      type: Date,
    },
    resumePath: {
      type: String,
    },
    filterScores: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    questions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    }],
    comments: [commentSchema],
    isInterviewed: {
      type: Boolean,
      default: false,
    },
    interviewDuration: {
      type: Number,
      default: 0,
    },
    isRoomOpened: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interviewee", intervieweeSchema);
