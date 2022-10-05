const morgan = require("morgan");

const mongooseLoader = require("./mongoose");
const expressLoader = require("./express");
const routerLoader = require("./router");

module.exports = ({ app }) => {
  mongooseLoader();
  app.use(morgan("dev"));

  expressLoader({ app, routerLoader });
};
