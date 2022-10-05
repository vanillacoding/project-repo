const morgan = require("morgan");

const mongooseLoader = require("./mongoose");
const expressLoader = require("./express");
const routerLoader = require("./router");
const socketLoader = require("./socket");

module.exports = ({ app }) => {
  mongooseLoader();

  app.use(morgan("dev"));

  expressLoader({ app, routerLoader });

  socketLoader({ app });
};
