const { gql } = require("apollo-server");

const typeDefs = gql`
  "post containing page information"
  type PostWithPage implements Pagination{
    docs: [Post]
    hasPrevPage: Boolean
    hasNextPage: Boolean
    prevPage: Int
    nextPage: Int
  }
`;

module.exports = typeDefs;
