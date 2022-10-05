const User = require('../models/User');

const findUser = async ({ email }) => {
  return await User.findOne({ email });
};

const createUser = async ({ name, email, image }) => {
  return await User.create({ name, email, image });
};

const loginUser = async ({ name, email, image }) => {
  const user = await findUser({ email });

  if (user) return user;
  return await createUser({ name, email, image });
};

module.exports = {
  findUser,
  createUser,
  loginUser,
};
