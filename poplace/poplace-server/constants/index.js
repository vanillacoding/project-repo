const ERROR = {
  sameNickname: "이미 존재하는 닉네임입니다.",
  notFoundUser: "정보를 찾을 수 없습니다.",
  invalidtags: "유효하지 않은 태그입니다",
  invalidPinData: "유효하지 않은 핀정보 입니다",
  invalidText: "유효하지 않은 텍스트 입니다",
  invalidImage: "유효하지 않은 이미지 입니다",
  invalidData: "유효하지 않은 정보 입니다",
  server: "일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요",
};

const PIN_COUNT = 30 * 1000;

module.exports = {
  ERROR,
  PIN_COUNT,
};
