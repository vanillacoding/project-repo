const user = require("./User");
const post = require("./Post");
const area = require("./Area");

const ping = {
  Query: {
    ping: () => "pong",
  },
};

const resolvers = [
  ping,
  user,
  post,
  area
];

module.exports = resolvers;
