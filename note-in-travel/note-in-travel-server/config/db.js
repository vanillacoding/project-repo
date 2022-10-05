const mongoose = require("mongoose");

const DB = process.env.DB_URL.replace(
  "<password>",
  process.env.DB_PASSWORD,
);

mongoose.connect(DB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

function initDb() {
  const db = mongoose.connection;

  db.on("error", (err) => console.log(`⛔ DB connection fail. ${err}`));
  db.once("open", () => console.log(`✅ DB connected to : http://localhost:${process.env.PORT}`));
}

exports.init = initDb;
