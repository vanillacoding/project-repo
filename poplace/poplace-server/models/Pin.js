const mongoose = require("mongoose");

const geoSchema = new mongoose.Schema({
  type: { type: String },
  enum: ["Point"],
  coordinates: {
    type: [Number],
    required: true,
    index: "2dsphere",
  },
});

const pinsSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: [{
    type: String,
    required: true,
  }],
  text: {
    type: String,
    minLength: 10,
    required: true,
  },
  tags: [{
    type: String,
    required: true,
  }],
  savedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  savedAt: {
    type: Date,
  },
  position: {
    type: geoSchema,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: { createdAt: true },
});

module.exports = mongoose.model("Pin", pinsSchema);
