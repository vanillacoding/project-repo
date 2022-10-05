import { uniqBy } from 'lodash';

export const getBranchList = (repoData) => {
  const branchList = repoData.logList.map((log) => ({
    branchName: log.branchName2,
    hash: log.hash,
  }));

  return uniqBy(branchList, 'branchName');
};

export const filterGitExtension = (repoUrl) =>
  repoUrl.indexOf('.git') === -1 ? repoUrl : repoUrl.slice(0, -4);
