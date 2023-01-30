const mongoose = require("mongoose");
const DEFAULT_GESTURE = require("../constants/defaultGesture");

const gestureSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  function: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pointer: {
    type: Number,
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
  position: {
    type: String,
  },
  count: {
    type: Number,
    required: true,
  },
});

const pcSchema = new mongoose.Schema({
  name: { type: String },
  ipAddress: { type: String },
  lastAccessDate: { type: Date },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  gesture: {
    type: [gestureSchema],
    default: DEFAULT_GESTURE,
  },
  customGesture: {
    path: { type: Array },
    function: { type: String },
  },
  pc: { type: pcSchema, default: {}, required: true },
});

module.exports = mongoose.model("User", userSchema);
