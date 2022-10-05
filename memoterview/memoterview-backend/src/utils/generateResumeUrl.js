const config = require("../config");

exports.generateResumeUrl = function (key) {
  return `https://${config.s3.bucketName}.s3.${config.s3.region}.amazonaws.com/${key}`;
};
