const User = require('../models/User');

class UserService {
  async createUser(
    uid,
    email,
    displayName,
    photoURL,
  ) {
    try {
      await User.create({
        uid,
        email,
        username: displayName,
        profile_img_url: photoURL,
      });
    } catch (err) {
      throw err;
    }
  }

  async getUserByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (err) {
      throw err;
    }
  }

  async getUserByMongooseId(id) {
    try {
      return await User.findById(id);
    } catch (err) {
      throw err;
    }
  }

  async getUserByMongooseIdAndUpdate(id, user) {
    try {
      return await User.findByIdAndUpdate(
        id,
        user,
        { new: true },
      );
    } catch (err) {
      throw err;
    }
  }

  async validateAuthor(currentBranch, email) {
    const userService = new UserService();

    const author = await userService.getUserByMongooseId(currentBranch.created_by);
    if (author.email === email) return true;

    return false;
  }
}

module.exports = UserService;
