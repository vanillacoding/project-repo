const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    "Query to check if the server is responsive"
    ping: String

    "Query to get users array. it is needed authorization token"
    users: [User]

    "Query to get login user. it is needed authorization token. data this token has is the logged-in user."
    loginUser: User

    "Query to get posts array. this query return with page information"
    posts(filter: String, page: Int, limit: Int, area: String, season: String, lat: Float, lng: Float, year: String): PostWithPage

    "Query to get logged-in user's Posts array. it is needed authorization token. data this token has is the logged-in user."
    myPosts(page: Int, limit: Int, area: String, lat: Float, lng: Float): PostWithPage

    "Query to get areas array."
    areas: [Area]

    "Query to get area area corresponding to longitude and latitude"
    myArea(lat: Float, lng: Float): Area
  }
`;

module.exports = typeDefs;
