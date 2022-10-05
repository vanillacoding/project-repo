const User = require("../models/User");

exports.checkUserService = async (id) => {
  try {
    const existedUser = await User.findOne({ id });

    return { existedUser };
  } catch (error) {
    return { checkUserError: error };
  }
};

exports.createUserService = async ({ id, userName, email, externalUrl, uri }) => {
  try {
    const newUser = await User.create({
      id,
      userName,
      email,
      externalUrl,
      uri,
    });

    return { newUser };
  } catch (error) {
    return { createUserError: error };
  }
};
