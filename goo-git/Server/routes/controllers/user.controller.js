const UserService = require('../../services/user.service');
const BranchService = require('../../services/branch.service');
const BranchSharingInfoService = require('../../services/branchSharingInfo.service');
const { permissionTypes, responseResults } = require('../../constants');
const { decode } = require('../../utils/jwt');
const tryCatchWrapper = require('../../utils/tryCatchWrapper');

const userService = new UserService();
const branchService = new BranchService();
const branchSharingInfoService = new BranchSharingInfoService();

exports.getCurrentUser = tryCatchWrapper(async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = decode(token);
  const user = await userService.getUserByMongooseId(decoded._id);

  res.status(200).json({
    result: responseResults.OK,
    user,
  });
});

exports.getAuthor = tryCatchWrapper(async (req, res) => {
  const author
    = await userService.getUserByMongooseId(req.params.author_id);

  res.status(200).json({
    result: responseResults.OK,
    author,
  });
});

exports.getSharedUserInfos = tryCatchWrapper(async (req, res) => {
  const { branch_id } = req.params;

  const branch
    = await branchService.getBranchByMongooseId(branch_id);

  const branchSharingInfos = await Promise.all(
    branch.sharing_infos.map(id => (
      branchSharingInfoService.getBranchSharingInfoByMongooseId(id)
    ))
  );

  const sharedUserInfos = await Promise.all(
    branchSharingInfos.map(async info => {
      const sharedUser
        = await userService.getUserByMongooseId(info.user_id);

      return {
        permission: info.has_writing_permission ? permissionTypes.WRITE : permissionTypes.READ_ONLY,
        sharedUser
      };
    })
  );

  return res.status(200).json({
    result: responseResults.OK,
    data: sharedUserInfos,
  });
});
