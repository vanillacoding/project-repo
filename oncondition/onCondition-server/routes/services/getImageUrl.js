const s3 = require("../../config/AWS");

async function getImageUrl(imageBase64) {
  const image = Buffer.from(imageBase64.split(",")[1], "base64");

  const photoKey = "album1/" + Date.now();

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: photoKey,
    Body: image,
  };

  const stored = await s3.upload(params).promise();

  return stored.Location;
}

module.exports = getImageUrl;
