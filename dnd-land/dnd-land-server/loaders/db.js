const mongoose = require("mongoose");

function connectMongoDB() {
  const db = mongoose.connection;

  db.on("error", console.error);
  db.once("open", () => console.log("Connected to mongoDB server"));

  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.MONGODB_NAME,
  });
}

module.exports = connectMongoDB;
