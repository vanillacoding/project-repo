import passport from 'passport';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import randomstring from 'randomstring';

const s3 = new aws.S3();
const bucket = 'wik';

export const authenticateWithJWT = passport.authenticate('jwt', { session: false });
export const upload = multer({
  storage: multerS3({
    s3,
    bucket,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const prefix = randomstring.generate();
      cb(null, prefix + file.originalname);
    }
  })
});
