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

const GOOGLE_API_SCOPE = {
  PLUS: 'https://www.googleapis.com/auth/plus.login',
  YOUTUBE: 'https://www.googleapis.com/youtube/v3',
};

module.exports = { CLIENT_URL, SERVER_URL, GOOGLE_API_SCOPE };
