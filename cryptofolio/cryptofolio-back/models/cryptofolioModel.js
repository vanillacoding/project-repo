const mongoose = require("mongoose");
const { getDate } = require("../utils/getDate");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const CryptofolioSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  createdBy: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: String,
    default: getDate(),
    required: true,
  },
  createdValue: {
    type: Number,
    required: true,
  },
  selectedList: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    enum: ["normal", "investment"],
    default: "normal",
    required: true,
  },
});

const Cryptofolio = mongoose.model("Cryptofolio", CryptofolioSchema);

module.exports = Cryptofolio;
