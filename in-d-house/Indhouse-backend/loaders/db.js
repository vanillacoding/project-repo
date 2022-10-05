const mongoose = require("mongoose");

const { databaseUrl, mongooseOptions } = require("../configs");

const dbLoader = () => {
  mongoose.connect(databaseUrl, mongooseOptions);
  mongoose.connection.on("error", () => console.log("MongoDB connection failure."));
  mongoose.connection.once("open", () => console.log("🔥🌏🔥 MongoDB connection success."));
};

module.exports = dbLoader;
