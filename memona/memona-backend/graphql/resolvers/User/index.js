const { usersQuery, loginUserQuery } = require("./querys");
const { loginMutation } = require("./mutations");

const resolvers = {
  Query: {
    users: (_, __, { dataSources, auth }) => usersQuery({ dataSources, auth }),
    loginUser: (_, __, { dataSources, auth }) => loginUserQuery({ dataSources, auth }),
  },
  User: {
    friends: async ({ friends }, __, { dataSources }) => {
      return await dataSources.users.getUsersByIds(friends);
    },
  },
  Mutation: {
    login: (_, args, { dataSources }) => loginMutation(args, dataSources.users),
  },
};

module.exports = resolvers;
