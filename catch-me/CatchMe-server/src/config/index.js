require("dotenv").config();

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

module.exports = {
  port: normalizePort(process.env.PORT || "4000"),
  databaseURL: process.env.MONGO_DB_URL,
  socketClientURL: process.env.CLIENT_URL,
};
