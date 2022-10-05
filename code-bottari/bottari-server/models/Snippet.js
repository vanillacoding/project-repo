const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const comment = mongoose.Schema({
  creator: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const snippetSchema = mongoose.Schema({
  creator: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  poster: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  commentList: [comment],
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  language: {
    type: String,
    required: true,
    enum: ["Python", "Java", "JavaScript", "C#", "C/C++", "PHP", "R", "Objective-C", "Others"],
  },
  code: {
    type: String,
    required: true,
  },
  likerList: [{
    type: ObjectId,
  }],
  hashtagList: [{
    type: String,
  }],
});

module.exports = mongoose.model("Snippet", snippetSchema);
