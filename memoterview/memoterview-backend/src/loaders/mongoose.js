const mongoose = require("mongoose");
const config = require("../config");

module.exports = async function () {
  mongoose.Promise = global.Promise;

  const dbConnection = await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: "memoterview",
  });

  const dbConnectionState = mongoose.connection.readyState;

  switch (dbConnectionState) {
    case 0:
      console.log("mongoDB disconnected..");
      break;
    case 1:
      console.log("mongoDB connected..");
      break;
    case 2:
      console.log("mongoDB connecting..");
      break;
    case 3:
      console.log("mongoDB disconnecting..");
      break;
    default: return null;
  }

  return dbConnection.connection.db;
};
