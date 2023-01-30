const http = require("http");
const express = require("express");
const expressLoader = require("./src/loaders/index");
const CONFIG = require("./src/config/constants");

const app = express();
const server = http.createServer(app);
const port = CONFIG.PORT;

(async () => {
  await expressLoader(app);
})();

app.set("port", port);
server.listen(port, () => {
  console.log(`server listen on ${port}`);
});

module.exports = app;
