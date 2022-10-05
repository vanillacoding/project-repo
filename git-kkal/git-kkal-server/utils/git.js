const { cloneDeep } = require('lodash');

const GIT = require('../constants/git');

const hasGitExtension = (repoName) => repoName.slice(-4) === GIT.GIT_EXTENSION;

const getRepoName = (repoUrl) =>
  hasGitExtension(repoUrl.split('/')[4])
    ? repoUrl.split('/')[4].slice(0, -4)
    : repoUrl.split('/')[4];

const changeBranchNameFormat = (logList) =>
  cloneDeep(logList).map((log) => {
    const splittedBranchName = log.branchName2.split('/');
    const hasTags = splittedBranchName.some((branch) => branch === 'tags');

    return {
      ...log,
      branchName2: hasTags
        ? null
        : splittedBranchName[splittedBranchName.length - 1],
    };
  });

module.exports = {
  hasGitExtension,
  getRepoName,
  changeBranchNameFormat,
};
