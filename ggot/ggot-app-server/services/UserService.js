const User = require('../models/User');

const UserService = {
  getExistingUser: async (email) => {
    const user = await User.findOne({ email: email })
                           .populate('photos');

    return user;
  },
  createNewUser: async (newUserData) => {
    const newUser = await User.create(newUserData);

    return newUser;
  }
};

module.exports = UserService;
