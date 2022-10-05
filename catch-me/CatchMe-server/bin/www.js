const debug = require("debug")("server:server");
const http = require("http");

const app = require("../app");
const { port, socketClientURL } = require("../src/config");

app.set("port", port);

const server = http.createServer(app);

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  
  const bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;

  debug("Listening on " + bind);
};

server.listen(port, () => console.log(`server is listening ${port}`));

server.on("error", onError);
server.on("listening", onListening);

app.io.attach(server, {
  cors: {
    origin: socketClientURL,
    credential: true,
    transports: ["websocket"],
  },
});
