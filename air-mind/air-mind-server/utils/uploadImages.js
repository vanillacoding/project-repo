const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3-v2');
const path = require('path');

const endpoint = new AWS.Endpoint(process.env.CLOUD_END_POINT);
const region = process.env.CLOUD_REGION;
const accessKey = process.env.CLOUD_ACCESS_KEY;
const secretKey = process.env.CLOUD_SECRET_KEY;

const s3 = new AWS.S3({
  endpoint,
  region,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
});

function setUpobjectStorage(bucket) {
  const upload = multer({
    storage: multerS3({
      s3,
      bucket,
      acl: 'public-read-write',
      limits: { fileSize: 5 * 1024 * 1024 },
      metadata(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key(req, file, cb) {
        const extension = path.extname(file.originalname);
        cb(null, file.originalname + Date.now().toString() + extension);
      },
    }),
  }).array('images');

  return upload;
}

module.exports = setUpobjectStorage;
