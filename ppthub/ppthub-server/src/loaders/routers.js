const indexRouter = require("../routes/index");

const routerLoader = async (app) => {
  app.use("/", indexRouter);
};

module.exports = routerLoader;
