const dotenv = require("dotenv");
const normalizePort = require("./utils/normalizePort");
dotenv.config();

const createConnection = require("./db");
const currentApp = require("./app");

const { STAGE, PORT } = process.env;

const port = normalizePort(PORT || "5000");

(async () => {
  console.log(`Stage "${STAGE}" is initializing...`);

  await createConnection();

  const graphQLServer = currentApp.listen(port).then(({ url }) => {
    console.log(`
      🚀  Server is running! ${url}
      📭  Query at playground: ${url}
      📭  Query at apollo studio: https://studio.apollographql.com/dev
    `);
  });
})();
