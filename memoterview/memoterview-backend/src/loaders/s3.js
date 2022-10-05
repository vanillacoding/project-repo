require("dotenv").config();
const config = require("../config");
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const bucketName = config.s3.bucketName;
const region = config.s3.region;
const accessKeyId = config.s3.ccessToken;
const secretAccessKey = config.s3.secretAccessKey;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

exports.uploadFileToS3 = (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadInfo = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadInfo).promise();
};

exports.getFileFromS3 = (fileKey) => {
  const downloadInfo = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadInfo).createReadStream();
};
