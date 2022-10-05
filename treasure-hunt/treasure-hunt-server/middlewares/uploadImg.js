const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const uploadImg = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'my-treasure-hunt',
    acl: 'public-read-write',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function(req, file, cb) {
      cb(null, Object.assign({}, req.body));
    },
    key: function(req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

const getImgUrl = (imgsInfo) => imgsInfo.map((img) => img.location);

const deleteImg = async(urlList) => {
  const array = urlList.map((url) => {
    const Key = url.split('/')[url.split('/').length - 1];
    const params = { Bucket: 'my-treasure-hunt', Key };
    return s3.deleteObject(params).promise();
  });

  return Promise.all(array);
};

module.exports = { uploadImg, getImgUrl, deleteImg };
