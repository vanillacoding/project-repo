const validator = require('validator');
const createError = require('http-errors');

const GIT = require('../constants/git');
const ERROR = require('../constants/error');
const { getRepoName } = require('../utils/git');

const repoUrlValidator = (req, res, next) => {
  try {
    const { repoUrl } = req.query;

    if (!repoUrl) {
      throw createError(400, ERROR.INVALID_REPO_URL);
    }

    const repoUrlLength = repoUrl.split('/').length;

    if (!repoUrl.trim()) {
      throw createError(400, ERROR.INVALID_REPO_URL);
    }

    if (!validator.isURL(repoUrl)) {
      throw createError(400, ERROR.INVALID_REPO_URL);
    }

    if (repoUrlLength !== GIT.VALID_URL_LENGTH) {
      throw createError(400, ERROR.INVALID_REPO_URL);
    }

    const repoName = getRepoName(repoUrl);

    if (!repoName.trim()) {
      throw createError(400, ERROR.INVALID_REPO_URL);
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = repoUrlValidator;
