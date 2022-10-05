const { fileUpload } = require("../../../utils/s3");
const { AWS_S3_IMAGE_BUCKET_NAME } = process.env;

exports.createPostMutation = async function createPostMutation({ file, input }, dataSources) {
  const { url } = await fileUpload({ file, bucketName: AWS_S3_IMAGE_BUCKET_NAME });

  const post = {
    ...input,
    postImageUrl: url,
  };

  const result = await dataSources.posts.createPost(post);

  return result;
};
