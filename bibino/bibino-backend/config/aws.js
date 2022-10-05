const AWS = require("aws-sdk");

const { awsAccessKeyID, awsSecretAccessKy } = require("./index");

AWS.config.credentials = new AWS.Credentials(awsAccessKeyID, awsSecretAccessKy);
