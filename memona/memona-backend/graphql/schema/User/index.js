const { gql } = require("apollo-server");

const typeDefs = gql`
  "registered user"
  type User {
    _id: ID!
    email: String!
    username: String!
    nickname: String
    imageUrl: String
    posts: [Post]
    friends: [User]
  }
`;

module.exports = typeDefs;
