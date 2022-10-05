const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Mixed } = Schema.Types;

const CoinSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
  },
  date: {
    type: String,
  },
  ticker: {
    type: String,
  },
  imagePath: {
    type: String,
  },
  categories: {
    type: [String],
    default: [],
  },
  portfolios: {
    type: [String],
    default: [],
  },
  circulatingSupply: {
    type: Mixed,
  },
  totalSupply: {
    type: Mixed,
  },
  maxSupply: {
    type: Mixed,
  },
  dominance: {
    type: Mixed,
  },
  price: {
    date: {
      type: String,
    },
    price: {
      type: Mixed,
    },
  },
  marketCap: {
    date: {
      type: String,
    },
    marketCap: {
      type: Mixed,
    },
  },
  exchanges: {
    type: [String],
    default: [],
  },
});

const Coin = mongoose.model("Coin", CoinSchema);

module.exports = Coin;
