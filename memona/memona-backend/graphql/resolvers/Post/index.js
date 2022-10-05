const { postsQuery, myPostsQuery } = require("./querys");
const { createPostMutation } = require("./mutations");

const resolvers = {
  Query: {
    posts: (_, args, { dataSources }) => postsQuery(args, dataSources),
    myPosts: (_, args, context) => myPostsQuery(args, context),
  },
  Post: {
    author: async ({ author }, __, { dataSources }) => {
      return await dataSources.users.getUser(author);
    },
  },
  Mutation: {
    createPost: (_, args, { dataSources }) => createPostMutation(args, dataSources),
  },
};

module.exports = resolvers;
