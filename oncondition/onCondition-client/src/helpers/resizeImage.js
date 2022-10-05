function resizeImage(imageUrl) {
  const image = new Image();
  image.src = imageUrl;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const MAX_WIDTH = 400;
  const MAX_HEIGHT = 400;
  let width = image.width;
  let height = image.height;

  if (width > height && width > MAX_WIDTH) {
    height *= MAX_WIDTH / width;
    width = MAX_WIDTH;
  } else if (height > MAX_HEIGHT) {
    width *= MAX_HEIGHT / height;
    height = MAX_HEIGHT;
  }

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  const resizedimageUrl = canvas.toDataURL(image.type);

  return resizedimageUrl;
}

export default resizeImage;
