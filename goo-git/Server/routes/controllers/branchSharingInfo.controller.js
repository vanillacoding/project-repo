const UserService = require('../../services/user.service');
const BranchService = require('../../services/branch.service');
const BranchSharingInfoService = require('../../services/branchSharingInfo.service');
const { responseResults, permissionTypes } = require('../../constants');
const tryCatchWrapper = require('../../utils/tryCatchWrapper');

const userService = new UserService();
const branchService = new BranchService();
const branchSharingInfoService = new BranchSharingInfoService();

exports.getBranchSharingInfo = tryCatchWrapper(async (req, res) => {
  const branchSharingInfoId = req.params['branch_sharing_info_id'];
  const branchSharingInfo
    = await branchSharingInfoService
      .getBranchSharingInfoByMongooseId(branchSharingInfoId);

  if (!branchSharingInfo) {
    res.status(400).json({
      result: responseResults.FAILURE,
      message: '잘못된 요청입니다',
    });
  }

  res.status(200).json({
    result: responseResults.OK,
    branchSharingInfo,
  });
});

exports.createBranchSharingInfo = tryCatchWrapper(async (req, res) => {
  const { branch_id } = req.params;
  const { email, permission } = req.body.sharingInfo;
  const hasPermission
    = permission === permissionTypes.WRITE;
  const sharedUser = await userService.getUserByEmail(email);
  const currentBranch
    = await branchService.getBranchByMongooseId(branch_id);
  const isAuthor
    = await userService.validateAuthor(currentBranch, email);

  if (isAuthor) {
    return res.json({
      result: responseResults.VALIDATION_ERR,
      message: '작성자에게 공유할 수 없습니다.',
    });
  }

  const hasAlreadyShared
    = await branchSharingInfoService
      .validateDuplication(currentBranch, email);

  if (hasAlreadyShared) {
    return res.json({
      result: responseResults.VALIDATION_ERR,
      message: '이미 공유했습니다.',
    });
  }

  const branchSharingInfo
    = await branchSharingInfoService
      .createBranchSharingInfo(
        sharedUser._id,
        branch_id,
        hasPermission
      );
  currentBranch.sharing_infos.push(branchSharingInfo._id);
  await branchService.getBranchByMongooseIdAndUpdate(branch_id, currentBranch);

  sharedUser.shared_branches_infos.push(branchSharingInfo._id);
  await userService
    .getUserByMongooseIdAndUpdate(sharedUser._id, sharedUser);

  return res.json({
    result: responseResults.OK,
  });
});

exports.updateSharedUserPermission = tryCatchWrapper(async (req, res) => {
  const { branch_id } = req.params;
  const permission
    = req.body.newPermission === permissionTypes.WRITE;
  const { sharedUserEmail } = req.body;
  const currentBranch
    = await branchService.getBranchByMongooseId(branch_id);
  const sharedUser
    = await userService.getUserByEmail(sharedUserEmail);
  let newBranchSharingInfo;

  for (let i = 0; i < currentBranch.sharing_infos.length; i++) {
    const branchSharingInfo
      = await branchSharingInfoService
        .getBranchSharingInfoByMongooseId(currentBranch.sharing_infos[i]);

    if (
      branchSharingInfo.user_id.toString()
      !== sharedUser._id.toString()
    ) {
      continue;
    }

    branchSharingInfo.has_writing_permission = permission;

    newBranchSharingInfo
      = await branchSharingInfoService
        .getBranchSharingInfoByMongooseIdAndUpdate(
          branchSharingInfo._id,
          branchSharingInfo
        );

  }

  return res.json({
    result: responseResults.OK,
    data: {
      permission: newBranchSharingInfo.has_writing_permission ? permissionTypes.WRITE : permissionTypes.READ_ONLY,
      sharedUser
    }
  });
});

exports.deleteSharedUserPermission = tryCatchWrapper(async (req, res) => {
  const { branch_id } = req.params;
  const { sharedUserEmail } = req.body;
  const currentBranch
    = await branchService.getBranchByMongooseId(branch_id);
  const sharedUser
    = await userService.getUserByEmail(sharedUserEmail);

  for (let i = 0; i < currentBranch.sharing_infos.length; i++) {
    const branchSharingInfo
      = await branchSharingInfoService
        .getBranchSharingInfoByMongooseId(currentBranch.sharing_infos[i]);

    if (
      branchSharingInfo.user_id.toString()
      !== sharedUser._id.toString()
    ) {
      continue;
    }

    const updatedSharedBranchesInfo
      = sharedUser.shared_branches_infos
        .filter(branchSharingInfoId => (
          branchSharingInfoId.toString()
          !== branchSharingInfo._id.toString()
        ));

    sharedUser.shared_branches_infos = updatedSharedBranchesInfo;
    await userService
      .getUserByMongooseIdAndUpdate(sharedUser._id, sharedUser);

    const updatedSharedUsersInfo
      = currentBranch.sharing_infos
        .filter(branchSharingInfoId => (
          branchSharingInfoId.toString()
          !== branchSharingInfo._id.toString()
        ));

    currentBranch.sharing_infos = updatedSharedUsersInfo;
    await branchService
      .getBranchByMongooseIdAndUpdate(
        currentBranch._id,
        currentBranch
      );

    await branchSharingInfoService
      .getBranchSharingInfoByMongooseIdAndDelete(branchSharingInfo._id);
  }

  return res.status(200).json({
    result: responseResults.OK,
  });
});
