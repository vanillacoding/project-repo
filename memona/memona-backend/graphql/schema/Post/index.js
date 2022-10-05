const { gql } = require("apollo-server");

const typeDefs = gql`
  "post data"
  type Post {
    _id: ID!
    author: User
    content: String
    postImageUrl: String
    location: PointGeoJson
    isAnonymous: Boolean
    area: String
    season: String
    year: String
    # comments: [Comment]
    # likes: [Like]
  }

  "Input data required to create post"
  input PostInput {
    author: ID!
    content: String
    location: PointGeoJsonInput!
    isAnonymous: Boolean!
    area: String!
    season: String!
    year: String!
  }

  "PointGeoJson is A geojson value that type is point."
  type PointGeoJson {
    type: String
    coordinates: [Float]
  }

  "Input data to receive PointGeoJson as input"
  input PointGeoJsonInput {
    type: String
    coordinates: [Float]
  }
`;

module.exports = typeDefs;
