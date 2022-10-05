import { DIRECTION } from "../../constants/index";

const movePaddle = (canvas, keyCode, paddleObj, distance) => {
  if (keyCode === DIRECTION.LEFT && paddleObj.x <= 0) {
    paddleObj.x = 0;
  } else if (keyCode === DIRECTION.LEFT) {
    paddleObj.x -= distance;
  }

  if (keyCode === DIRECTION.RIGHT && paddleObj.x + paddleObj.width >= canvas.width) {
    paddleObj.x = canvas.width - paddleObj.width;
  } else if (keyCode === DIRECTION.RIGHT) {
    paddleObj.x += distance;
  }
};

export default movePaddle;
