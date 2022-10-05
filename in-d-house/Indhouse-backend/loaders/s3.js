const AWS = require("aws-sdk");

const { awsConfig } = require("../configs");

AWS.config.update(awsConfig);

module.exports = new AWS.S3(awsConfig);
