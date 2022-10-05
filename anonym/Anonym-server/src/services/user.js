const User = require("../model/User");

exports.updateUserName = async (id, userName) => {
  try {
    const filter = { _id: id };
    const update = { userName };
    const user = await User.findOneAndUpdate(filter, update, { new: true });
    await user.populate("followings", "userName thumnail").execPopulate();

    return {
      status: 201,
      message: "Update UserName Success",
      user,
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateUserThumnail = async (id, thumnail) => {
  try {
    const filter = { _id: id };
    const update = { thumnail };
    const user = await User.findOneAndUpdate(filter, update, { new: true });
    await user.populate("followings", "userName thumnail").execPopulate();

    return {
      status: 201,
      message: "Update UserName Success",
      user,
    };
  } catch (err) {
    throw new Error(err);
  }
}
exports.searchUsers = async (searchTerm) => {
  try {
    const userList = await User.find({ userName: { $regex: searchTerm } });

    return {
      status: 200,
      message: "Search UserList Success",
      userList,
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.followUser = async (userID, targetID) => {
  try {
    const currentUser = await User.findOne({ _id: userID });
    const targetUser = await User.findOne({ _id: targetID });

    currentUser.followings.addToSet(targetUser);
    await currentUser.save();
    await currentUser.populate("followings", "userName thumnail").execPopulate();
    targetUser.followers.addToSet(currentUser);
    await targetUser.save();

    return {
      status: 201,
      message: "Follow User Success",
      currentUser,
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.unfollowUser = async (userID, targetID) => {
  try {
    const currentUser = await User.findOne({ _id: userID });
    const targetUser = await User.findOne({ _id: targetID });

    currentUser.followings.pull(targetUser);
    await currentUser.save();
    await currentUser.populate("followings", "userName thumnail").execPopulate();
    targetUser.followers.pull(currentUser);
    await targetUser.save();

    return {
      status: 201,
      message: "Follow User Success",
      currentUser,
    };
  } catch (err) {
    throw new Error(err);
  }
};
