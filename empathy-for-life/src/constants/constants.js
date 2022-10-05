const DOG_PROFILE_TITLES = [
  { en: "name", ko: "이름" },
  { en: "breed", ko: "견종" },
  { en: "gender", ko: "성별" },
  { en: "age", ko: "나이" },
  { en: "weight", ko: "무게" },
  { en: "heart_worm", ko: "심장사상충" },
  { en: "neutering", ko: "중성화" },
  { en: "adoption_status", ko: "입양 상태" },
];
const CHATS = {
  CONNECTED_USER: "connected user",
  MESSAGE: "message",
  DISCONNECTED_USER: "disconnected user",
};
const DEFAULT_ERROR_MESSAGE = "오류가 발생했습니다.\n잠시후 다시 시도해 주세요.";
const IMAGE_URLS = {
  DOGS_HANGING_FRONT: "/assets/images/dogs-hanging-front.png",
  DOGS_HANGING_BACK: "/assets/images/dogs-hanging-back.png",
  DOGS_SPRITE: "/assets/images/dogs-sprite.png",
  GOOGLE_ICON: "/assets/images/google-icon.png",
  GRASS_GROUND: "/assets/images/grass-ground.png",
  PERSON_SPRITE: "/assets/images/person-sprite.png",
};
const DIRECTIONS = {
  38: "up",
  40: "down",
  39: "right",
  37: "left",
};
const LIMIT_FILE_SIZE = 5 * 1048576;
const AXIS_CORRECTION = {
  x: 1.3,
  y: 1.3,
};
const ID_TOKEN_KEY = "empathyForLifeIdToken";

export {
  CHATS,
  DOG_PROFILE_TITLES,
  DEFAULT_ERROR_MESSAGE,
  IMAGE_URLS,
  DIRECTIONS,
  LIMIT_FILE_SIZE,
  AXIS_CORRECTION,
  ID_TOKEN_KEY,
};
