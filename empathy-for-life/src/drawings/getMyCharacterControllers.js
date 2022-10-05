import getPersonCharacter from "../utils/getPersonCharacter";
import { DIRECTIONS } from "../constants/constants";

function getMyCharacterControllers(canvasWidth, canvasHeight, character = "person0", userName = "") {
  const myCharacter = getPersonCharacter(character);
  const drawSize = myCharacter.drawSize;
  let destinationX = 0;
  let destinationY = 0;
  const MOVE_DISTANCE = 12;

  const myCharacterDrawingObject = {
    type: "person",
    name: userName,
    sx: myCharacter.walk.down.x,
    sy: myCharacter.walk.down.y,
    sWidth: myCharacter.walk.down.width,
    sHeight: myCharacter.walk.down.height,
    lastDx: destinationX,
    lastDy: destinationY,
    dx: destinationX,
    dy: destinationY,
    dWidth: drawSize,
    dHeight: drawSize,
  };

  const walkMyCharacter = (event) => {
    const direction = DIRECTIONS[event.keyCode];

    if (!direction) {
      return;
    }

    myCharacterDrawingObject.lastDx = myCharacterDrawingObject.dx;
    myCharacterDrawingObject.lastDy = myCharacterDrawingObject.dy;

    if (direction === "up") {
      if (myCharacter.walk.up.x === myCharacter.walk.up.maxX) {
        myCharacter.walk.up.x = myCharacter.walk.up.initX;
      } else {
        myCharacter.walk.up.x += myCharacter.walk.up.gap;
      }

      if (0 < destinationY) {
        destinationY -= MOVE_DISTANCE;
      }

      myCharacterDrawingObject.sx = myCharacter.walk.up.x;
      myCharacterDrawingObject.dy = destinationY;
    }

    if (direction === "right") {
      if (myCharacter.walk.right.x === myCharacter.walk.right.maxX) {
        myCharacter.walk.right.x = myCharacter.walk.right.initX;
      } else {
        myCharacter.walk.right.x += myCharacter.walk.right.gap;
      }

      if (destinationX < canvasWidth - drawSize) {
        destinationX += MOVE_DISTANCE;
      }

      myCharacterDrawingObject.sx = myCharacter.walk.right.x;
      myCharacterDrawingObject.dx = destinationX;
    }

    if (direction === "down") {
      if (myCharacter.walk.down.x === myCharacter.walk.down.maxX) {
        myCharacter.walk.down.x = myCharacter.walk.down.initX;
      } else {
        myCharacter.walk.down.x += myCharacter.walk.down.gap;
      }

      if (destinationY < canvasHeight - drawSize) {
        destinationY += MOVE_DISTANCE;
      }

      myCharacterDrawingObject.sx = myCharacter.walk.down.x;
      myCharacterDrawingObject.dy = destinationY;
    }

    if (direction === "left") {
      if (myCharacter.walk.left.x === myCharacter.walk.left.maxX) {
        myCharacter.walk.left.x = myCharacter.walk.left.initX;
      } else {
        myCharacter.walk.left.x += myCharacter.walk.left.gap;
      }

      if (0 < destinationX) {
        destinationX -= MOVE_DISTANCE;
      }

      myCharacterDrawingObject.sx = myCharacter.walk.left.x;
      myCharacterDrawingObject.dx = destinationX;
    }
  };

  const stopMyCharacter = (event) => {
    const direction = DIRECTIONS[event.keyCode];

    if (!direction) {
      return;
    }

    myCharacterDrawingObject.lastDx = myCharacterDrawingObject.dx;
    myCharacterDrawingObject.lastDy = myCharacterDrawingObject.dy;
    myCharacter.walk[direction].x = myCharacter.walk[direction].initX;
    myCharacter.walk[direction].y = myCharacter.walk[direction].initY;
    myCharacterDrawingObject.sx = myCharacter.walk[direction].x;
    myCharacterDrawingObject.sy = myCharacter.walk[direction].y;
  };

  return { myCharacterDrawingObject, walkMyCharacter, stopMyCharacter };
};

export default getMyCharacterControllers;
