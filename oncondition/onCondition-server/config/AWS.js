const AWS = require("aws-sdk");

AWS.config.update({
  region: process.env.BUCKET_REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.IDENTITY_POOL_ID,
  }),
});

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: process.env.BUCKET_NAME },
});

module.exports = s3;
