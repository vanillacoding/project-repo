const initServerLoaders = require("./server");
const connectDB = require("./db");

module.exports = (app) => {
  initServerLoaders(app);
  connectDB();
};
