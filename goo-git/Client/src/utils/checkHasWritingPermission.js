import requestBranchSharingInfo from '../api/requestBranchSharingInfo';

export default async function checkHasWritingPermission(
  currentUser,
  currentNote,
  currentBranch,
  setHasWritingPermission
) {
  if (!currentNote) return setHasWritingPermission(true);

  if (currentNote._id !== currentBranch.latest_note) {
    return setHasWritingPermission(false);
  }

  if (currentBranch.created_by === currentUser._id) {
    return setHasWritingPermission(true);
  }

  const sharedUserInfoIds = currentBranch.sharing_infos;

  for (let i = 0; i < sharedUserInfoIds.length; i++) {
    const branchSharingInfo
      = await requestBranchSharingInfo(currentUser._id, sharedUserInfoIds[i]);

    if (branchSharingInfo?.has_writing_permission) {
      return setHasWritingPermission(true);
    }
  }

  return setHasWritingPermission(false);
}
