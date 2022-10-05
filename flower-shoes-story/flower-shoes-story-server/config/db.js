const mongoose = require("mongoose");

const connectMongoDB = () => {
  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", (err) => console.error(`DB connection Error : \n${err}`));
  db.once("open", () => console.log("MongoDB Connected"));

  return db;
};

module.exports = connectMongoDB;
