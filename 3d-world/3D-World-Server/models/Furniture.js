const mongoose = require("mongoose");

const furnitureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required."],
  },
  position: {
    type: Array,
    required: [true, "position is required"],
  },
  direction: {
    type: Array,
    default: [0, 0, 0],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Furniture", furnitureSchema);
