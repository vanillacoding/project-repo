const multer = require('multer');
const upload = multer();

exports.uploadS3 = upload.fields([
  { name: 'photo' },
  { name: 'text' },
  { name: 'templateId' }
]);
