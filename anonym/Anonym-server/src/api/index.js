const root = require("./routes/root");
const auth = require("./routes/auth");
const streaming = require("./routes/streaming");
const user = require("./routes/user");

const setRoutes = (app) => {
  root(app);
  auth(app);
  user(app);
  streaming(app);
};

module.exports = setRoutes;
