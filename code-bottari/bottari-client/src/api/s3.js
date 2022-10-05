import { DEFAULT_IMAGE_URL } from "../constants/constants";
import { EXCESSIVE_IMAGE_SIZE } from "../constants/messages";

const bucketName = process.env.REACT_APP_S3_BUCKET_NAME;
const bucketRegion = process.env.REACT_APP_S3_BUCKET_REGION;
const IdentityPoolId = process.env.REACT_APP_S3_IDENTITY_POOL_ID;

const AWS = require("aws-sdk");

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: {
    Bucket: bucketName,
  }
});

export default function addPhoto() {
  const files = document.getElementById("uploader").files;

  if (!files.length) {
    return DEFAULT_IMAGE_URL;
  }

  const maxSize = 1 * 1024 * 1024;
  const fileSize = files[0].size;

  if (fileSize > maxSize) {
    alert(EXCESSIVE_IMAGE_SIZE);

    return;
  }

  const file = files[0];
  const fileName = file.name;
  const ALBUM_PHOTOS_KEY = "profilePic";
  const ACL = "public-read";

  const Key = `${ALBUM_PHOTOS_KEY}/${fileName}`;

  return s3.upload({
    Key,
    Body: file,
    ACL,
  }).promise();
}
