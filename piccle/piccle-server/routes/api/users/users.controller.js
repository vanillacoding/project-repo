const aws = require('aws-sdk');
const User = require('../../../models/User');
const Photo = require('../../../models/Photo');
const credentials = require('../../../config/credentials');
const { NotFoundError } = require('../../../lib/errors');
const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET,
  AWS_REGION
} = credentials;


/*
  GET /api/users/:user_id/my-photos
*/

exports.myPhotos = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { _id, myPhotoIds } = res.locals.userData;

    if (user_id === _id.toString()) {
      const photoList = await Photo.find({_id: {$in: myPhotoIds}});
      const myPhotoList = photoList.map(list => {
        const { photoUrl, lat, lon } = list;
        return { photoUrl, lat, lon, showPhoto: true };
      });
      res.json({ myPhotoList });
    } else {
      throw err('Invalid user');
    }
  } catch(err) {
    const { name, message } = err;
    next(new NotFoundError(name, message));
  }
}


/*
  GET /api/users/:user_id/received-photos
*/

exports.receivedPhotos = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { _id, receivedPhotoIds } = res.locals.userData;

    if (user_id === _id.toString()) {
      const list = receivedPhotoIds.map(id => {
        return Photo.findById(id);
      });
      const photoList = await Promise.all(list);
      const receivedPhotoList = photoList.map(list => {
        const { photoUrl, lat, lon } = list;
        return { photoUrl, lat, lon, showPhoto: true };
      });
      res.json({ receivedPhotoList });
    } else {
      throw err('Invalid user');
    }
  } catch(err) {
    const { name, message } = err;
    next(new NotFoundError(name, message));
  }
}


/*
  POST /api/users/:user_id/my-photos
*/

exports.newPhoto = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { lat, lon, createdAt } = req.body;
    const { _id, receivedPhotoIds } = res.locals.userData;

    const getPhotoUrl = () => {
      const buffer = req.files.photo[0].buffer;
      const type = 'jpg';
      const userId = user_id;
      const date = Date.now().toString();

      const s3 = new aws.S3({
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        accessKeyId: AWS_ACCESS_KEY_ID,
        region: AWS_REGION
      });

      const params = {
        Bucket: AWS_BUCKET,
        Key: `photos/${userId}_${date}`,
        Body: buffer,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${type}`
      }

      s3.upload(params, (err, data) => {
        if (err) {
          throw new Error('s3 upload failed');
        } else {
          const photoUrl = data.Location;
          saveNewPhoto(photoUrl);
        }
      });
    };

    const saveNewPhoto = async photoUrl => {
      const newPhoto = new Photo({
        by: user_id,
        photoUrl,
        lat,
        lon,
        createdAt
      });

      const newPhotoInfo = await newPhoto.save();
      updateMyPhotoList(newPhotoInfo);
    };

    const updateMyPhotoList = async newPhotoInfo => {
      const { _id, by } = newPhotoInfo;
      const newPhotoId = _id.toString();
      await User.findByIdAndUpdate(by, {$push: {myPhotoIds: newPhotoId}}, {new: true});
      getNewPhoto(by);
    }

    const getNewPhoto = async userId => {
      const othersPhoto = await Photo.find({by: {$ne: userId}}).sort({createdAt: -1}).limit(10).exec();
      const receivedNewPhoto = othersPhoto.find(photo => {
        if (!receivedPhotoIds.includes(photo._id.toString())) {
          return photo;
        }
      });
      updateReceivedPhotoList(receivedNewPhoto);
    }

    const updateReceivedPhotoList = async receivedNewPhoto => {
      const { _id } = receivedNewPhoto;
      const receivedPhotoId = _id.toString();
      await User.findByIdAndUpdate(user_id, {$push: {receivedPhotoIds: receivedPhotoId}}, {new: true});
      res.json({ message: 'success' });
    }

    if (user_id === _id.toString()) {
      getPhotoUrl();
    } else {
      throw err('Invalid user');
    }

  } catch(err) {
    const { name, message } = err;
    next(new NotFoundError(name, message));
  }
}
