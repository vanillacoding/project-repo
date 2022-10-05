const BranchSharingInfo = require('../models/BranchSharingInfo');
const UserService = require('./user.service');

class BranchSharingInfoService {
  async createBranchSharingInfo(user_id, branch_id, has_writing_permission) {
    try {
      return await BranchSharingInfo.create({
        user_id, branch_id, has_writing_permission
      });
    } catch (err) {
      throw err;
    }
  }

  async getBranchSharingInfoByMongooseId(id) {
    try {
      return await BranchSharingInfo.findById(id);
    } catch (err) {
      throw err;
    }
  }

  async getBranchSharingInfoByMongooseIdAndUpdate(id, branchSharingInfo) {
    try {
      return await BranchSharingInfo.findByIdAndUpdate(
        id,
        branchSharingInfo,
        { new: true },
      );
    } catch (err) {
      throw err;
    }
  }

  async getBranchSharingInfoByMongooseIdAndDelete(id) {
    try {
      return await BranchSharingInfo.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }

  async validateAuthor(currentBranch, email) {
    const userService = new UserService();
    const author
      = await userService
        .getUserByMongooseId(currentBranch.created_by);

    if (author.email === email) return true;

    return false;
  }

  async validateDuplication(currentBranch, email) {
    try {
      const userService = new UserService();

      if (!currentBranch.sharing_infos.length) return false;

      const currentBranchSharingInfo = await Promise.all(
        currentBranch.sharing_infos.map(id => (
          this.getBranchSharingInfoByMongooseId(id)
        ))
      );

      const sharedUsers = await Promise.all(
        currentBranchSharingInfo.map(branchSharingInfo => (
          userService.getUserByMongooseId(branchSharingInfo.user_id)
        ))
      );

      const alreadySharedUser
        = sharedUsers.filter(user => user.email === email);

      if (!alreadySharedUser.length) return false;

      return true;
    } catch (err) {
      throw err;
    }
  }

  async deleteBranchSharingInfo(id) {
    try {
      await BranchSharingInfo.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BranchSharingInfoService;
