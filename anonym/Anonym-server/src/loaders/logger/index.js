const fs = require("fs");
const logger = require("morgan");

const loggerLoader = (app) => {
  const accessLogStream = fs.createWriteStream("access.log", { flags: "a" });

  switch (process.env.NODE_ENV) {
    case "production":
      app.use(logger("combined", { stream: accessLogStream }));
      break;
    case "development":
      app.use(logger("dev"));
      break;
    default:
      app.use(logger("combined", { stream: accessLogStream }));
  }
};

module.exports = loggerLoader;
