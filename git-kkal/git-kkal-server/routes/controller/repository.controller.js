const fs = require('fs');
const path = require('path');
const simpleGit = require('simple-git');
const createError = require('http-errors');

const ERROR = require('../../constants/error');
const GIT = require('../../constants/git');
const STRING_PROCESSING = require('../../constants/stringProcessing');

const graphDataGenerator = require('../../utils/graphDataGenerator');
const lindDataGenerator = require('../../utils/lineDataGenerator');
const { parseDiffToObject, getDiff } = require('../../utils/diff');
const { changeBranchNameFormat, getRepoName } = require('../../utils/git');

const getDiffData = async (req, res, next) => {
  const { repoUrl, commitHash } = req.query;

  const url = `${repoUrl}/commit/${commitHash}.diff`;

  const result = {
    changedFileList: [],
  };

  try {
    const { data } = await getDiff(url);

    const fileList = data.split(STRING_PROCESSING.DIFF_GIT).slice(1);

    if (!fileList.length) {
      return res.status(200).json(result);
    }

    result.changedFileList = parseDiffToObject(fileList);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getRepoData = async (req, res, next) => {
  const logOption = [GIT.LOG_OPTION_ALL];
  const cloneOption = [GIT.CLONE_OPTION_NO_CHECK_OUT];
  const formatOptions = {
    format: GIT.PRETTY_FORMAT_OPTIONS,
  };

  const { repoUrl } = req.query;
  const repoName = getRepoName(repoUrl);

  try {
    try {
      await simpleGit().clone(repoUrl, cloneOption);
    } catch (err) {
      throw createError(400, ERROR.FAIL_TO_CLONE);
    }

    const clonedGit = await simpleGit(path.resolve(`./${repoName}`));

    if (!clonedGit) {
      throw createError(400, ERROR.GIT_NOT_FOUND);
    }

    const { all: logListData } = await clonedGit.log(logOption, formatOptions);

    const formattedLogList = changeBranchNameFormat(logListData);

    const data = {
      repoName,
      maxPipeCount: null,
      logList: null,
      lineList: null,
    };

    try {
      const { logList, maxPipeCount } = graphDataGenerator(formattedLogList);
      const lineList = lindDataGenerator(logList);
      data.maxPipeCount = maxPipeCount;
      data.logList = logList;
      data.lineList = lineList;
    } catch (err) {
      throw createError(401, ERROR.FAIL_TO_MAKE_GRAPH_DATA);
    }

    if (!data.logList) {
      throw createError(401, ERROR.FAIL_TO_LOG);
    }

    fs.rmdir(`./${repoName}`, { recursive: true }, (err) => {
      if (err) {
        throw createError(401, ERROR.FAIL_TO_DELETE_CLONED_DIRECTORY);
      }

      res.status(200).json(data);
    });
  } catch (err) {
    fs.rmdir(`./${repoName}`, { recursive: true }, () => {
      next(err);
    });
  }
};

module.exports = { getDiffData, getRepoData };
