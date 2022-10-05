import S3FileUpload from 'react-s3';
import S3Config from '../configs/S3Config';

export default async function uploadImageToS3(file) {
  try {
    const response = await S3FileUpload.uploadFile(file, S3Config);
    return response.location;
  } catch (error) {
    console.log(error);
  }
}
