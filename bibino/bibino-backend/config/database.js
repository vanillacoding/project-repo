const mongoose = require("mongoose");

const { databaseURI, databasePassword } = require("./index");

const connectMongoose = async () => {
  try {
    await mongoose.connect(
      databaseURI.replace("<password>", databasePassword),
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        dbName: "bibino",
      }
    );
    console.log("Successfully connected to mongodb");
  } catch (error) {
    console.error(`Error on connect to mongodb ${error}`);
  }
};

connectMongoose();
