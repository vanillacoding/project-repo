const mongoose = require("mongoose");

exports.pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

exports.polygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Polygon"],
    required: true,
  },
  coordinates: {
    type: [[[Number]]], // Array of arrays of arrays of numbers
    required: true,
  },
});
