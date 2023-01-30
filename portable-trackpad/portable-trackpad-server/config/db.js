const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log("MongoDB Disconnected...", error);
  }
};
