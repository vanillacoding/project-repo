const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "Connection error:"));
    db.once("open", console.log.bind(console, "Connected to database.."));

    await mongoose.connect(process.env.DB_HOST);
  } catch (err) {
    console.log(err);
  }
};
