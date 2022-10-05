const { AuthenticationError } = require("apollo-server");

module.exports = function authCheck(auth) {
  if (!auth) throw new AuthenticationError("not authenticated");
};
