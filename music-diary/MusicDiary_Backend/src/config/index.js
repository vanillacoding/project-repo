require("dotenv").config();

process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  port: normalizePort(process.env.PORT || "5000"),
  databaseURL: process.env.MONGO_DB_URL,
};

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
