const createError = require('http-errors');
const axios = require('axios');
const REGEX = require('../constants/regex');
const ERROR = require('../constants/error');
const STRING_PROCESSING = require('../constants/stringProcessing');

const getDiff = async (url) => {
  try {
    const data = await axios.get(url);

    return data;
  } catch (err) {
    if (err.response) {
      throw createError(404, ERROR.FAIL_TO_GET_DIFF);
    }
  }
};

const getFileName = (file) => {
  const result = file.split('\n')[0].split(' b/')[1];
  return result;
};

const getLineAndOffsetNumbers = (lineNumbers, minusIndex, spacePlusIndex) => {
  const [beforeLine, beforeOffset] = lineNumbers
    .slice(minusIndex + STRING_PROCESSING.MINUS.length, spacePlusIndex)
    .split(',')
    .map(Number);
  const [afterLine, afterOffset] = lineNumbers
    .slice(spacePlusIndex + STRING_PROCESSING.SPACE_PLUS.length)
    .split(',')
    .map(Number);

  return {
    before: {
      line: beforeLine,
      offset: beforeOffset,
    },
    after: {
      line: afterLine,
      offset: afterOffset,
    },
  };
};

const createFilePositionObject = (matchedString, before, after, index) => ({
  matchedString,
  before,
  after,
  index,
});

const getChangedFilePosition = (file, regex) => {
  const result = [];

  function execRegexWhileNull() {
    const execResultArray = regex.exec(file);

    if (execResultArray === null) {
      return;
    }

    const [matchedString] = execResultArray;
    const lineNumbers = matchedString.slice(
      STRING_PROCESSING.AT_SIGN_BEGIN.length,
      -1 * STRING_PROCESSING.AT_SIGN_END.length
    );

    const minusIndex = lineNumbers.indexOf(STRING_PROCESSING.MINUS);
    const spacePlusIndex = lineNumbers.indexOf(STRING_PROCESSING.SPACE_PLUS);

    const { before, after } = getLineAndOffsetNumbers(
      lineNumbers,
      minusIndex,
      spacePlusIndex
    );

    result.push(
      createFilePositionObject(matchedString, before, after, regex.lastIndex)
    );

    execRegexWhileNull();
  }

  execRegexWhileNull();

  return result;
};

const divideLog = (logList) => {
  const beforeLogList = logList.filter((log) => log[0] !== '+');
  const afterLogList = logList.filter((log) => log[0] !== '-');

  return { beforeLogList, afterLogList };
};

const getChangedFileLog = (file, changedFileInfoList) => {
  const result = [...changedFileInfoList];

  for (let i = 0; i < result.length; i++) {
    const currIndex = result[i].index;
    const nextIndex =
      i !== result.length - 1
        ? result[i + 1].index - result[i + 1].matchedString.length
        : undefined;

    const [codeBeginHunk, ...logList] = file
      .slice(currIndex, nextIndex)
      .split('\n')
      .slice(0, -1);

    const { beforeLogList, afterLogList } = divideLog(logList);

    result[i].codeBeginHunk = codeBeginHunk
      ? codeBeginHunk.slice(1)
      : codeBeginHunk;
    result[i].before.logList = beforeLogList;
    result[i].after.logList = afterLogList;
  }

  return result;
};

const parseDiffToObject = (fileList) => {
  const changedFileList = [];

  fileList.forEach((file) => {
    const fileName = getFileName(file);

    const changedFileInfoList = getChangedFilePosition(
      file,
      REGEX.FILE_LINE_OFFSET
    );

    const changedFileInfoAndLogList = getChangedFileLog(
      file,
      changedFileInfoList
    );

    const changedLog = changedFileInfoAndLogList.map(
      ({ codeBeginHunk, matchedString, before, after }) => ({
        codeBeginHunk,
        codeLineOffsetString: matchedString,
        before,
        after,
      })
    );

    changedFileList.push({ fileName, changedLog });
  });

  return changedFileList;
};

module.exports = {
  parseDiffToObject,
  getDiff,
};
