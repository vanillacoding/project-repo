/**
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
 *
 * @param {number} deg rotation degree
 * @param {object} ctx canvas context
 * @param {object} img image node
 * @param {number} dx
 * @param {number} dy
 * @param {number} dWidth
 * @param {number} dHeight
 * @param {number} sx
 * @param {number} sy
 * @param {number} sWidth
 * @param {number} sHeight
 * @param {number} currentFrame current frame of sprite image
 */
const rotateImage = (
  deg,
  ctx,
  img,
  dx,
  dy,
  dWidth,
  dHeight,
  sx,
  sy,
  sWidth,
  sHeight,
  currentFrame
) => {
  ctx.translate(dx + dWidth / 2, dy + dHeight / 2);
  ctx.rotate(deg * Math.PI / 180);

  if (sx) {
    ctx.drawImage(
      img,
      sx * currentFrame,
      sy,
      sWidth,
      sHeight,
      -(dWidth / 2),
      -(dHeight / 2),
      dWidth,
      dHeight
    );

    return;
  }

  ctx.drawImage(
    img,
    dx,
    dy,
    dWidth,
    dHeight
  );
};

export default rotateImage;
