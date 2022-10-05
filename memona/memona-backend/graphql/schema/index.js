const querys = require("./Query");
const mutations = require("./Mutation");
const interfaces = require("./Interface");
const user = require("./User");
const post = require("./Post");
const postWithPage = require("./PostWithPage");
const area = require("./Area");

const typeDefs = [
  querys,
  mutations,
  interfaces,
  user,
  post,
  postWithPage,
  area
];

module.exports = typeDefs;
