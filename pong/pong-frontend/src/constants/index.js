const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  BATTLE: "/battle",
  RANKING: "/ranking",
};

const NUMBERS = {
  SUBTRACT_NUMBER: 1,
  HALF: 2,
  WIN_SCORE: 3,
  MODAL_COUNT: 3,
  INITIAL_COUNT: 3,
  END_COUNT: 0,
  MODAL_TIMEOUT: 1000,
  RESET_TIMEOUT: 3000,
  DELAY: 1000,
  INITIAL_SCORE: 0,
};

const DIRECTION = {
  LEFT: 37,
  RIGHT: 39,
};

const MESSAGE = {
  FINDING_USER: "Finding User...",
  MATCHING_USER: "User matched!",
  RECESSMODAL_READY: "GET READY!",
  RECESSMODAL_COUNTDOWN: "CONTDOWN",
};

const COLORS = {
  USER_PADDLE: "#E9ECEF",
  PARTNER_PADDLE: "#9C6644",
};

export { ROUTES, NUMBERS, DIRECTION, MESSAGE, COLORS };