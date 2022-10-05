const resizeBase64ImageAsync = (base64, width, height) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.style.width = `${width.toString()}px`;
    canvas.style.height = `${height.toString()}px`;
    const context = canvas.getContext("2d");
    const image = document.createElement("img");
    image.src = base64;
    image.onload = () => {
      context.scale(width / image.width, height / image.height);
      context.drawImage(image, 0, 0);
      resolve(canvas.toDataURL());
    image.onerror = (error) => reject(error);
    };
  });
};

export default resizeBase64ImageAsync;
