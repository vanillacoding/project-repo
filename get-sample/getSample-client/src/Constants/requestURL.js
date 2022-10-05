const REQUEST = {
  LOGIN: '/api/auth/google',
  LOGIN_SUCCESS: '/api/auth/google/login/success',
  LOGOUT: '/api/auth/google/logout',
  POST_SEARCH_RESULT_FOR_VIDEO: '/api/videos',
  GET_VIDEO_SUCCESS: '/api/videos/success',
  POST_SEARCH_RESULT_FOR_DICTIONARY: '/api/dictionary',
  GET_DICTIONARY_SUCCESS: '/api/dictionary/success',
  POST_ADDED_WORD: '/api/myWords',
  DELETE_WORD: '/api/myWords',
};

const localClientDomain = 'http://localhost:3000';
const cloudClientDomain = 'https://getsample.letsdoyi.com';

const localServerDomain = 'http://localhost:4000';
const cloudServerDomain = 'https://api.letsdoyi.com';

const SERVER_URL =
  process.env.NODE_ENV === 'development'
    ? localServerDomain
    : cloudServerDomain;

const CLIENT_URL =
  process.env.NODE_ENV === 'development'
    ? localClientDomain
    : cloudClientDomain;

module.exports = { CLIENT_URL, SERVER_URL, REQUEST };
