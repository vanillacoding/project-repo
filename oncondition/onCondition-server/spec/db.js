const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongodb;

exports.dbConnect = async function () {
  mongodb = await MongoMemoryServer.create();

  const uri = await mongodb.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

exports.dbDisconnect = async function () {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongodb.stop();
};
