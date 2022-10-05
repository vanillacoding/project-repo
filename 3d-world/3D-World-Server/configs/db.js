const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

function initDb() {
  const db = mongoose.connection;

  db.on("error", (err) => console.error(err));
  db.once("open", () => console.log("Connected to Database"));
}

exports.init = initDb;
