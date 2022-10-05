const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
});

db.on("error", console.error);

db.once("open", () => {
  console.log("Successfully connected to mongdb");
});
