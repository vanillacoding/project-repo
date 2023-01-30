const mongoose = require("mongoose");
const CONFIG = require("../config/constants");

const mongooseLoader = async () => {
  try {
    await mongoose.connect(CONFIG.MONGODB_URL, { useNewUrlParser: true });

    console.info("Connected to database...");
  } catch (err) {
    console.error("connection error");
  }
};

module.exports = mongooseLoader;
