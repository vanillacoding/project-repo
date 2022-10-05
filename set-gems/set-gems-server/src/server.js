const app = require("./express/app");
const http = require("http");

const createWsServer = require("./socket");

const port = process.env.PORT || "8000";

app.set("port", port);

const server = http.createServer(app);
createWsServer(server);

server.listen(port);
server.on("error", handleServerError);
server.on("listening", handleServerListen);

function handleServerError(err) {
  if (err.syscall !== "listen") {
    throw err;
  }

  const bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  switch (err.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw err;
  }
}

function handleServerListen() {
  const addr = server.address();
  const bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;
  console.log("Listening on " + bind);
}
