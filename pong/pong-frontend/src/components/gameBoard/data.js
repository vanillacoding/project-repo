import { COLORS } from "../../constants";

const canvasData = {
  ballObj: {
    x: 250,
    y: 250,
    dx: 0,
    dy: 5,
    radius: 10,
    speed: 10,
  },
  userPaddleObj: {
    height: 20,
    width: 100,
    x: 250,
    color: COLORS.USER_PADDLE
  },
  partnerPaddleObj: {
    height: 20,
    width: 100,
    x: 250,
    color: COLORS.PARTNER_PADDLE
  },
};

export default canvasData;
