const mongoose = require("mongoose");

const { saveAreas, savePosts } = require("./json/saveDB");

const { MONGO_ENDPOINT, STAGE } = process.env;

module.exports = async function createConnection() {
  switch (STAGE) {
    default: {
      break;
    }
    case "development":
    case "alpha": {
      mongoose.set("debug", true);
      break;
    }
  }

  console.log("MongoDB connecting...");

  const connection = await mongoose.connect(MONGO_ENDPOINT, {
    dbName: "memona",
    autoIndex: STAGE === "development",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  console.log("MongoDB is connected with mongoose");

  // await saveAreaData();
  // console.log("complete saving area json datas");

  // await savePosts();
  // console.log("complete saving post datas");

  return connection;
};
