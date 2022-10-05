const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((result) => result.connection.getClient());

const db = mongoose.connection;
let url = null;

switch (process.env.NODE_ENV) {
  case "production":
    url = `http://localhost:${process.env.PORT || 4000}`;
    // 배포 후 수정
    break;
  case "development":
    url = `http://localhost:${process.env.PORT || 4000}`;
    break;
  default:
    url = `http://localhost:${process.env.PORT || 4000}`;
}

db.on("error", () => console.log(`❌ DB Connection Failed at ${url}!`));
db.once("open", () => console.log(`✅ Connected DB to: ${url}`));
