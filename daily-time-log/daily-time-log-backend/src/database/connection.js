const mongoose = require("mongoose");

const MONGO_DB_URL =
  process.env.NODE_ENV === "development"
    ? process.env.MONGO_DB_LOCAL_URL
    : process.env.MONGO_DB_ATLAS_URL;

(async function () {
  try {
    await mongoose.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 5000,
    });

    console.log("✅ DB connected");
  } catch (err) {
    console.log("⛔️ database err:", err);
  }
})();

module.exports = mongoose;
