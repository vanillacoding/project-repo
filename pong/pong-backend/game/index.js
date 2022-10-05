const { ballData, userPaddleData, partnerPaddleData } = require("./data");
const { userPaddleCollision, partnerPaddleCollision } = require("./paddleCollision");

const calculateBallPosition = (canvas) => {
  if (!canvas) {
    return { ballData, userPaddleData, partnerPaddleData };
  };

  ballData.x += ballData.dx;
  ballData.y += ballData.dy;

  if (ballData.y - ballData.radius < 0) {
    ballData.dx = 0;
    ballData.dy = 5;
    ballData.x = canvas.width / 2;
    ballData.y = canvas.height / 2;

    return {
      ballData,
      end: true,
      isBallTop: true,
    };
  }

  if (ballData.y > canvas.height - ballData.radius) {
    ballData.dx = 0;
    ballData.dy = 5;
    ballData.x = canvas.width / 2;
    ballData.y = canvas.height / 2;

    return {
      ballData,
      end: true,
      isBallTop: false,
    };
  }

  if (
    ballData.x - ballData.radius < 0 ||
    ballData.x + ballData.radius > canvas.width
    ) {
    ballData.dx *= -1;
  }

  userPaddleCollision();
  partnerPaddleCollision(canvas);

  return { ballData };
};

module.exports = calculateBallPosition;
