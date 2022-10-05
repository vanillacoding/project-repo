const mongoose = require("mongoose");
const URI = process.env.MONGO_DB;

if (process.env.NODE_ENV !== "test") {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
  }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successful");
    }
  });

  const db = mongoose.connection;

  db.on("error", (err) => console.log(`Connection error ${err}`));
  db.once("open", () => console.log("Connected to DB!"));
} else {
  require("../spec/db");
}
