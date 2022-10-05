const { ballData, userPaddleData, partnerPaddleData } = require("./data");

module.exports.userPaddleCollision = () => {
  if (
    ballData.x < userPaddleData.x + userPaddleData.width &&
    ballData.x >= userPaddleData.x &&
    userPaddleData.y < userPaddleData.y + userPaddleData.height &&
    ballData.y + ballData.radius > userPaddleData.y - userPaddleData.height / 2
    ) {
    let collisionPoint = ballData.x - (userPaddleData.x + userPaddleData.width / 2);

    collisionPoint = collisionPoint / (userPaddleData.width / 2);

    const angle = (collisionPoint * Math.PI) / 3;

    ballData.dx = ballData.speed * Math.sin(angle);
    ballData.dy = ballData.speed * Math.cos(angle) * -1;

    ballData.speed += 0.5;
  }
};

module.exports.partnerPaddleCollision = (canvas) => {
  if (
    ballData.x >= canvas.width - partnerPaddleData.x - partnerPaddleData.width &&
    ballData.x < canvas.width - partnerPaddleData.x &&
    ballData.y < partnerPaddleData.y + partnerPaddleData.height &&
    ballData.y - ballData.radius < partnerPaddleData.y + partnerPaddleData.height / 2
    ) {
    ballData.dy *= -1;
    ballData.y += 7.5;

    if (ballData.dy > 0) ballData.dy += 0.5;
    if (ballData.dy < 0) ballData.dy -= 0.5;

    if (ballData.dx > 0) ballData.dx += 0.5;
    if (ballData.dx < 0) ballData.dx -= 0.5;
  }
};
