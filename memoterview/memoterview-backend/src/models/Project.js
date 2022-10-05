const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  candidates: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interviewee",
    }],
    default: [],
  },
  status: {
    type: String,
    enum: ["Active", "Closed"],
    default: "Active",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interviewer",
    required: true,
  },
  filters: {
    type: Array,
    default: [],
  },
  participants: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interviewer",
    }],
    default: [],
  },
  category: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
