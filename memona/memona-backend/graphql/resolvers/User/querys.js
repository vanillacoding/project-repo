const authCheck = require("../authCheck");

exports.usersQuery = async function usersQuery({ dataSources, auth }) {
  authCheck(auth);
  const user = await dataSources.users.getUsers();

  return user;
};

exports.loginUserQuery = async function loginUserQuery({ dataSources, auth }){
  authCheck(auth);
  const user = await dataSources.users.getUser(auth._id);

  return user;
};
