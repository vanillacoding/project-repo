const { gql } = require("apollo-server");

const typeDefs = gql`
  type Mutation {
    "Mutation to login. if type is one of social login, must need token argument."
    login(type: String, token: String, email: String, password: String): String

    "Mutation to create post. It is recommended that the file size does not exceed 2 MB."
    createPost(input: PostInput!, file: Upload): Post!
  }
`;

module.exports = typeDefs;
