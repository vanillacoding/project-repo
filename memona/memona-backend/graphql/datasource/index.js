const Users = require("./Users");
const Posts = require("./Posts");
const Areas = require("./Areas");
const UserModel = require("../../models/User");
const PostModel = require("../../models/Post");
const AreaModel = require("../../models/Area");
const KakaoAPI = require("./KakaoAPI");

function dataSources() {
  return {
    users: new Users(UserModel),
    posts: new Posts(PostModel),
    areas: new Areas(AreaModel),
    kakaoAPI: new KakaoAPI(),
  };
}

module.exports = dataSources;
