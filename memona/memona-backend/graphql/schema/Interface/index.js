const { gql } = require("apollo-server");
const typeDefs = gql`
  "Interface containing page information"
  interface Pagination {
    hasPrevPage: Boolean
    hasNextPage: Boolean
    prevPage: Int
    nextPage: Int
  }
`;

module.exports = typeDefs;
