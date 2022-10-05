const morgan = require("morgan");

const expressLoader = require("./express");
const routerLoader = require("./router");
const socketLoader = require("./socket");
const mongooseLoader = require("./mongoose");

module.exports = ({ app }) => {
  mongooseLoader();

  app.use(morgan("dev"));
  
  expressLoader({ app, routerLoader });

  socketLoader({ app });
};
