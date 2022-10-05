const { getAreasQuery, myAreaQuery } = require("./querys");

const resolvers = {
  Query: {
    areas: (_, __, { dataSources }) => getAreasQuery(dataSources), 
    myArea: (_, args, { dataSources }) => myAreaQuery(args, dataSources),
  },
};

module.exports = resolvers;
