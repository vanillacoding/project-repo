import getDogCharacter from "../utils/getDogCharacter";

const getAutomaticMoveDog = (dog) => {
  const MOVE_DISTANCE = 10;
  const dogCharacter = getDogCharacter(dog.character);


  dog.shouldUpdate = false;
  dog.hadRequest = false;
  dog.sx = dogCharacter.walk.down.initX;
  dog.sy = dogCharacter.walk.down.initY;
  dog.sWidth = dogCharacter.walk.down.width;
  dog.sHeight = dogCharacter.walk.down.height;
  dog.dx = dog.targetCoordinates.x;
  dog.dy = dog.targetCoordinates.y;
  dog.dWidth = dogCharacter.walk.down.width;
  dog.dHeight = dogCharacter.walk.down.height;

  const moveDog = () => {
    const { targetCoordinates } = dog;
    const isInCoordinateXBoundary
      = targetCoordinates.x - 20 <= dog.dx
        && dog.dx <= targetCoordinates.x + 20;
    const isInCoordinateYBoundary
      = targetCoordinates.y - 20 <= dog.dy
        && dog.dy <= targetCoordinates.y + 20;

    const shouldUpdateCoordinate
      = isInCoordinateYBoundary && isInCoordinateXBoundary

    if (shouldUpdateCoordinate) {
      dog.sx = dogCharacter.walk.down.initX;
      dog.sy = dogCharacter.walk.down.initY;
      dog.sWidth = dogCharacter.walk.down.width;
      dog.sHeight = dogCharacter.walk.down.height;
      dog.dWidth = dogCharacter.walk.down.width;
      dog.dHeight = dogCharacter.walk.down.height;
      dog.shouldUpdate = true;
      return;
    }

    if (targetCoordinates.y < dog.dy) {
      dogCharacter.walk.toUp();
      dog.sx = dogCharacter.walk.up.x;
      dog.sy = dogCharacter.walk.up.y;
      dog.sWidth = dogCharacter.walk.up.width;
      dog.sHeight = dogCharacter.walk.up.height;
      dog.dy -= MOVE_DISTANCE;
      dog.dWidth = dogCharacter.walk.up.width;
      dog.dHeight = dogCharacter.walk.up.height;
    }

    if (dog.dy < targetCoordinates.y) {
      dogCharacter.walk.toDown();
      dog.sx = dogCharacter.walk.down.x;
      dog.sy = dogCharacter.walk.down.y;
      dog.sWidth = dogCharacter.walk.down.width;
      dog.sHeight = dogCharacter.walk.down.height;
      dog.dy += MOVE_DISTANCE;
      dog.dWidth = dogCharacter.walk.down.width;
      dog.dHeight = dogCharacter.walk.down.height;
    }

    if (dog.dx < targetCoordinates.x) {
      dogCharacter.walk.toRight();
      dog.sx = dogCharacter.walk.right.x;
      dog.sy = dogCharacter.walk.right.y;
      dog.sWidth = dogCharacter.walk.right.width;
      dog.sHeight = dogCharacter.walk.right.height;
      dog.dx += MOVE_DISTANCE;
      dog.dWidth = dogCharacter.walk.right.width;
      dog.dHeight = dogCharacter.walk.right.height;
    }

    if (targetCoordinates.x < dog.dx) {
      dogCharacter.walk.toLeft();
      dog.sx = dogCharacter.walk.left.x;
      dog.sy = dogCharacter.walk.left.y;
      dog.sWidth = dogCharacter.walk.left.width;
      dog.sHeight = dogCharacter.walk.left.height;
      dog.dx -= MOVE_DISTANCE;
      dog.dWidth = dogCharacter.walk.left.width;
      dog.dHeight = dogCharacter.walk.left.height;
    }
  };

  const timeId = setInterval(moveDog, 100);
  moveDog();

  dog.stop = () => {
    clearInterval(timeId);
  };
};

export default getAutomaticMoveDog;
