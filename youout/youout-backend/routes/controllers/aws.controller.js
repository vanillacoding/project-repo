const AWS = require('aws-sdk');

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_KEY_ID,
  AWS_REGION
} = process.env;
const config = new AWS.Config({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_KEY_ID,
  region: AWS_REGION,
});
const client = new AWS.Rekognition(config);

exports.rekognition = (req, res, next) => {
  const { datauri } = req.body;

  const buffer = Buffer.from(datauri.split(',')[1], 'base64');
  const params = {
    Image: {
      Bytes: buffer
    },
    MaxLabels: 10,
    MinConfidence: 70,
  };

  client.detectLabels(params, function (err, response) {
    if (err) return next(err);

    res.json({ result: 'ok', data: response });
  });
};
