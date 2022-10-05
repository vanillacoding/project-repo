export const QUIZ = 'quiz';
export const ROOMS = 'rooms';
export const RANKERS = 'rankers';

export const BREAKER_LENGTH = 2;
export const QUIZ_LENGTH = 7;
export const INITIAL_OPPONENT_LEVEL = 1;
export const INITIAL_ITEMS_COUNTS = 5;

export const ROUTE = {
  MENU: '/',
  READY: '/ready',
  READY_ID: '/ready/:roomId',
  BREAKING: '/breaking',
  BREAKING_ID: '/breaking/:roomId',
  ROOMS: '/rooms',
  ROOM: '/room',
  ROOM_ID: '/room/:roomId',
  GAME_OVER: '/gameover',
  BATTLE_OVER_ID: '/battleover/:roomId',
  BATTLE_OVER: '/battleover',
  RANKING: '/ranking',
  GAME_RULES: '/gamerules',
  ERROR: '/error',
};

export const ANSWER_TIME = 10;
export const BREAKING_TIME = {
  1: 10,
  2: 7,
  3: 10,
  4: 10,
  5: 7,
  6: 7,
  7: 5,
};

export const SCORES = {
  1: 20,
  2: 30,
  3: 40,
  4: 50,
  5: 60,
  6: 70,
  7: 230,
};

export const GAME_STATUS = {
  BEFORE_START: 'BEFORE START',
  ICE_BREAKING_TIME: 'ICE BREAKING TIME',
  ANSWER_GUESS_TIME: 'ANSWER GUESS TIME',
  RESULT_DISPLAY_TIME: 'RESULT TIME',
  END: 'END',
};

export const ITEM = {
  EFFECT: {
    ADD_USER_TIME: 'ADD USER TIME',
    REDUCE_OPPONENT_TIME: 'REDUCE OPPONENT TIME',
  },
};

export const ATTACK = {
  REDUCE: {
    message: '😱 -5초 공격을 받았습니다',
  },
};

export const MODAL_TITLE = {
  INPUT_HOST_NAME: '방에 참가할 닉네임을 입력해주세요',
  PASS_ROOM_ID: '친구에게 방ID를 전달해주세요😀',
};
