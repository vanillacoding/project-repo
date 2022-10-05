const mongoose = require("mongoose");
const URI = process.env.MONGO_DB;

if (process.env.NODE_ENV !== "test") {
  async function connectDB() {
    try {
      await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
      });

      console.log("connected to database successfully");
    } catch(err) {
      console.error(err);
    }
  }

  connectDB();

  const db = mongoose.connection;

  db.on("error", (err) => console.error(err));
  db.once("open", () => console.log("Connected to database.."));
}
