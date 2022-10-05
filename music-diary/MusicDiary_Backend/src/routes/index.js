const apiRouter = require("./api");

module.exports = app => {
  app.use("/", apiRouter);
};
