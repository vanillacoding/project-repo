const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'ap-northeast-2'
});

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});

const uploadPhoto = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'ggot-app-photo-storage',
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

const getPhotoUrl = (photosInfo) => photosInfo.map((photo) => photo.location);

const deletePhoto = async(urlList) => {
  const array = urlList.map((url) => {
    const Key = url.split('/')[url.split('/').length - 1];
    const params = { Bucket: 'ggot-app-photo-storage', Key};

    return s3.deleteObject(params).promise();
  });

  return Promise.all(array);
};

module.exports = { uploadPhoto, getPhotoUrl, deletePhoto};
