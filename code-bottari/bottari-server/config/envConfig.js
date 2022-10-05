require("dotenv").config();

module.exports = {
  CLIENT_URL: process.env.CLIENT_URL,
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  SLACK_SIGNING_SECRET: process.env.SLACK_SIGNING_SECRET,
  SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
  SLACK_APP_TOKEN: process.env.SLACK_APP_TOKEN,
  SLACK_BOT_CLIENT_ID: process.env.SLACK_BOT_CLIENT_ID,
  SLACK_BOT_CLIENT_SECRET: process.env.SLACK_BOT_CLIENT_SECRET,
  SECRET_KEY: process.env.SECRET_KEY,
  TYPE: process.env.TYPE,
  PROJECT_ID: process.env.PROJECT_ID,
  PRIVATE_KEY_ID: process.env.PRIVATE_KEY_ID,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
  CLIENT_EMAIL: process.env.CLIENT_EMAIL,
  CLIENT_ID: process.env.CLIENT_ID,
  AUTH_URI: process.env.AUTH_URI,
  TOKEN_URI: process.env.TOKEN_URI,
  AUTH_PROVIDER_X509_CERT_URL: process.env.AUTH_PROVIDER_X509_CERT_URL,
  CLIENT_X509_CERT_URL: process.env.CLIENT_X509_CERT_URL,
};
