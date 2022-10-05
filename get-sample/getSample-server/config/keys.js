// Connect Dotenv
require('dotenv').config();

module.exports = {
  google: {
    apiKey: process.env.GOOGLE_APIKEY,
    clientID: process.env.GOOGLE_WEB_CLIENT_ID,
    clientSecret: process.env.GOOGLE_WEB_CLIENT_SECRET,
  },
  session: {
    secret: process.env.SESSION_SECRET,
  },
  cookie: {
    session: process.env.COOKIE_SESSION,
  },
  X_Rapid: {
    apiKey: process.env.X_RAPID_APIKEY,
  },
};
