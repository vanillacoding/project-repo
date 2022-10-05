const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  interviewee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interviewee",
  },
  interviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interviewer",
  },
  category: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
