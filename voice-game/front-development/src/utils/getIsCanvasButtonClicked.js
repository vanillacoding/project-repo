/**
 * This function return boolean whether click event occurs in specific canvas button
 * @param {array} clickedInfo List of clicked position in canvas.
 * @param {array} buttonInfo List of button position, width, height in canvas
 */
const getIsCanvasButtonClicked = (clickedInfo, buttonInfo) => {
  const [clickedPosX, clickedPosY] = clickedInfo;
  const [buttonPosX, buttonPosY, buttonWidth, buttonHeight] = buttonInfo;

  const isXRegionClicked = buttonPosX < clickedPosX && buttonPosX + buttonWidth > clickedPosX;
  const isYRegionClicked = buttonPosY < clickedPosY && buttonPosY + buttonHeight > clickedPosY;

  return isXRegionClicked && isYRegionClicked;
};

export default getIsCanvasButtonClicked;
