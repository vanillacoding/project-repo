const router = require('express').Router();
const authMiddleware = require('../../../middlewares/auth');
const controller = require('./users.controller');
const multer = require('multer');
const upload = multer();

router.use('/:user_id', authMiddleware);
router.get('/:user_id/my-photos', controller.myPhotos);
router.get('/:user_id/received-photos', controller.receivedPhotos);

const cpUpload = upload.fields([
  {name: 'photo'},
  {name: 'lat'},
  {name: 'lon'},
  {name: 'createdAt'}
]);

router.post('/:user_id/my-photos', cpUpload, controller.newPhoto);

module.exports = router;
