const mongoose = require("mongoose");

const puzzleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  markup: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  },
  cssBefore: {
    type: String,
    required: true
  },
  cssAfter: {
    type: String,
    required: true
  },
  output: {
    type: String,
    required: true
  },
  hint: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Puzzle", puzzleSchema);
