const AWS = require("aws-sdk");
const CONFIG = require("../config/constants");

const s3 = new AWS.S3({
  accessKeyId: CONFIG.AWS_ACCESS_KEY_ID,
  secretAccessKey: CONFIG.AWS_SECRET_ACCESS_KEY,
  region: CONFIG.AWS_REGION,
});

const uploadPpt = async (pptx, fileName) => {
  const decode = Buffer.from(pptx, "base64");
  const parameter = {
    Bucket: process.env.AWS_BUCKET,
    Key: `${fileName}.pptx`,
  };
  const uploadParameter = {
    ACL: "public-read",
    Body: decode,
    ContentType:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  };

  try {
    await s3.upload({ ...parameter, ...uploadParameter }).promise();

    return s3.getSignedUrl("getObject", parameter).split("?")[0];
  } catch (error) {
    return new Error(error);
  }
};

module.exports = uploadPpt;
