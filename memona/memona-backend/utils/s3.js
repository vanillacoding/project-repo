const stream = require("stream");
const AWS = require("aws-sdk");
const {
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  AWS_S3_REGION,
} = process.env;

AWS.config = new AWS.Config();
AWS.config.update({
  region: AWS_S3_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

function createUploadStream(key, bucketName) {
  const pass = new stream.PassThrough();
  return {
    writeStream: pass,
    promise: s3
      .upload({
        Bucket: bucketName,
        Key: key,
        Body: pass,
      })
      .promise(),
  };
}

exports.fileUpload = async function fileUpload({ file, bucketName }) {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const stream = createReadStream();
  const filePath = filename;
  const uploadStream = createUploadStream(filePath, bucketName);

  stream.pipe(uploadStream.writeStream);

  const result = await uploadStream.promise;
  const link = result.Location;

  return { filename, mimetype, encoding, url: link };
};
