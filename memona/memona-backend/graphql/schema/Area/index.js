const { gql } = require("apollo-server");

const typeDefs = gql`
  "Area is location information"
  type Area {
    _id: ID
    name: String!
    location: PolygonGeoJson!
  }

  "PolygonGeoJson is A geojson value that type is polygon representing location information."
  type PolygonGeoJson {
    type: String!
    coordinates: [[[Float]]]
  }
`;

module.exports = typeDefs;
