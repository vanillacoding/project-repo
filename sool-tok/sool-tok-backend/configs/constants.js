const ROUTE = {
  USERS: '/users',
  LOGIN: {
    GOOGLE: '/login/google',
    TOKEN: '/login/token',
  },
  USER: {
    LOGOUT: '/:user_id/logout',
    FRIENDS: {
      ROOT: '/:user_id/friends',
      REQUEST: '/:user_id/friends/request',
    },
  },
};

const SOCKET_EVENT = {
  CREATE_ROOM: 'create room',
  JOIN_ROOM: 'join room',
  ROOM_LIST: 'room list',
  MEMBER_JOINED: 'member joined',
  MEMBER_LEAVED: 'member leaved',
  LEAVE_ROOM: 'leave room',
  SENDING_SIGNAL: 'sending signal',
  RETURNING_SIGNAL: 'returning signal',
  CHAT: 'chat',
  VIDEO_FILTER: 'video filter',
  LOCKING_STATUS: 'locking status',
  RESET_GAME: 'reset game',
  START_GAME: 'start game',
  INIT_GAME: 'init game',
  PROCEED_GAME: 'proceed game',
  TURN_CHANGE: 'turn change',
};

const RESULT_OK = { result: 'ok' };

const MESSAGE = {
  ROOM: {
    NOT_EXIST: { message: '방이 존재하지 않습니다 😢' },
    LOCKED: { message: '방이 잠겨있습니다 🔒' },
    FULL: { message: '방이 가득 찼습니다 😅' },
  },
  FRIEND_REQUEST: {
    NOT_EXIST: '존재하지 않는 유저입니다.',
    TO_ME: '나에게 친구 신청을 할 수 없습니다.',
    ALREADY_FRIEND: name => `${name}님은 이미 친구 상태 입니다.`,
    ALREADY_REQUESTED: name => `${name}님에게 이미 친구 요청을 보냈습니다.`,
    SUCCESS: name => `${name}님에게 친구 요청을 보냈습니다.`,
  },
};

module.exports = {
  ROUTE,
  SOCKET_EVENT,
  RESULT_OK,
  MESSAGE,
};
