const mongoose = require("mongoose");

const connectMongoDB = () => {
  mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    dbName: "fantasy-baseball",
  });

  const db = mongoose.connection;
  db.on("error", (err) => console.error(`DB connection Error : \n${err}`));
  db.once("open", () => console.log("Connected"));
};

module.exports = connectMongoDB;
