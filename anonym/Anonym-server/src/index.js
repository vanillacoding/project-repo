const server = require("./loaders/socket");
require("./loaders/db");
require("./loaders/socket");

const handleListening = () => {
  console.log(`✅ Listening on: http://localhost:${process.env.PORT}`);
};

server
  .listen(process.env.PORT, handleListening)
  .on("error", (err) => {
    console.log(err);
  });
