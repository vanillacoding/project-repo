const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("../../loaders/s3");

const { userPhotoBucket, musicPhotoBucket } = require("../../configs");

const uploadUserPhoto = multer({
  storage: multerS3({
    s3,
    bucket: userPhotoBucket,
    acl: "public-read-write",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => cb(null, `${Date.now()}${file.originalname}`),
  }),
}).single("photo");

const uploadMusicCoverPhoto = multer({
  storage: multerS3({
    s3,
    bucket: musicPhotoBucket,
    acl: "public-read-write",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => cb(null, `${Date.now()}${file.originalname}`),
  }),
}).single("photo");

module.exports = {
  uploadUserPhoto,
  uploadMusicCoverPhoto,
};
