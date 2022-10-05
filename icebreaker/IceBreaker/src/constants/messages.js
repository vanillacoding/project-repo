export const RESET = {
  type: '',
  text: '',
};

export const GAME = {
  SHARE: {
    type: 'game',
    text: '아이스브레이커 URL이 복사되었습니다!',
  },
  FILL_BLANK: {
    type: 'game',
    text: '이름이 입력되지 않았습니다',
  },
  EXIST_RANK: {
    type: 'game',
    text: '이미 존재하는 이름입니다. 다시 입력해주세요',
  },
};

export const USE_ITEM = {
  GUIDE: {
    type: 'item',
    text: '원하는 콜라아이템을 눌러주세요',
  },
  NOPE: {
    type: 'item',
    text: '콜라아이템이 부족합니다',
  },
  ONLY_BATTLE: {
    type: 'item',
    text: '같이 얼음깨기 모드에서만 사용 가능합니다',
  },
};

export const BATTLE = {
  WAITING: {
    type: 'battle',
    text: '전달받은 ID로도 들어갈 수 있습니다',
  },
  PLEASE_READY: {
    type: 'battle',
    text: '모두 READY를 누르면 3초후 게임이 시작됩니다',
  },
  START: {
    type: 'battle',
    text: '곧 게임이 시작됩니다',
  },
};

export const ENTER_ROOM = {
  EXIST_NAME: {
    type: 'enterRoom',
    text: '방장과 같은 이름으로 설정할 수 없습니다',
  },
  FILL_NAME: {
    type: 'enterRoom',
    text: '닉네임은 공백으로 설정할 수 없습니다',
  },
  FILL_BLANK: {
    type: 'enterRoom',
    text: 'ID가 입력되지 않았습니다',
  },
  INVALID_ID: {
    type: 'enterRoom',
    text: '존재하지 않는 ID입니다. 다시 확인해주세요!',
  },
  ONLY_NUMBER: {
    type: 'enterRoom',
    text: 'ID는 모두 숫자입니다',
  },
};

export const MAKE_ROOM = {
  FILL_BLANK: {
    type: 'makeRoom',
    text: '닉네임은 공백으로 설정할 수 없습니다',
  },
  URL_COPIED: {
    type: 'makeRoom',
    text: '방ID가 클립보드에 복사되었습니다',
  },
};

export const VALIDATION_INPUT = {
  TYPE: 'validationInput',
  FILL_BLANK: {
    type: 'validationInput',
    text: '아무 글자도 입력되지 않았습니다',
  },
  ONLY_KOREAN: {
    type: 'validationInput',
    text: '아이스브레이커 정답은 모두 한글입니다',
  },
};

export const VALIDATION_ANSWER = {
  TYPE: 'validationAnswer',
  ALL_WRONG: {
    type: 'validationAnswer',
    text: '단 한 글자도 맞지 않네요',
  },
};

export const BREAK = {
  1: {
    type: 'break',
    text: '시간 내에 최대한 많은 얼음을 깨주세요!',
  },
  2: {
    type: 'break',
    text: '시간 내에 최대한 많은 얼음을 깨주세요!',
  },
  3: {
    type: 'break',
    text: '이번엔 한 번에 깨기 어려울 거에요',
  },
  4: {
    type: 'break',
    text: '열번 찍어도 안 깨지는 얼음이 있다?',
  },
  5: {
    type: 'break',
    text: '조심하세요! 여러 얼음들이 섞여 있어요',
  },
  6: {
    type: 'break',
    text: '얼음 깨기에 시간이 부족할 수도 있어요',
  },
  7: {
    type: 'break',
    text: '이번 얼음만 깨면 아이스브레이커가 될 수 있어요!',
  },
};

export const ANSWER = {
  1: {
    type: 'answer',
    text: '⏰ 제한 시간 내에 정답을 맞춰주세요 ⏰ ',
  },
  2: {
    type: 'answer',
    text: '⏰ 제한 시간 내에 정답을 맞춰주세요 ⏰ ',
  },
  3: {
    type: 'answer',
    text: '🥤 어렵다면 아이템를 사용해보세요 🥤 ',
  },
  4: {
    type: 'answer',
    text: '🥤 상대방의 정답시간을 줄이는 아이템도 있어요  🥤',
  },
  5: {
    type: 'answer',
    text: '🧊 깰수록 브레이킹 실력이 늘어요! 🔨',
  },
  6: {
    type: 'answer',
    text: '🧊 깰수록 브레이킹 실력이 늘어요! 🔨',
  },
  7: {
    type: 'answer',
    text: '🥤 정답시간 늘이기 아이템를 사용해보세요 🥤 ',
  },
};
