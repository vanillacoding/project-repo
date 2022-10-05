const mongoose = require("mongoose");
const { Schema } = mongoose;

const MetaDataSchema = new Schema({
  time: {
    type: String,
  },
  premium: {
    type: String,
  },
  marketCapDollar: {
    type: Number,
  },
  rate: {
    type: Number,
  },
  marketCapWon: {
    type: Number,
  },
  dominance: {
    type: String,
  },
});

const MetaData = mongoose.model("MetaData", MetaDataSchema);

module.exports = MetaData;
