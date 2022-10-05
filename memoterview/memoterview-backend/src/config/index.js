require("dotenv").config();

// Set the NODE_ENV to "development" by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  port: normalizePort(process.env.PORT || "5000"),
  databaseURL: process.env.MONGO_DB_URL,
  socketClientURL: process.env.CLIENT_URI,
  s3: {
    bucketName: process.env.AWS_BUCKET_NAME,
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  accessToken: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  },
  mailing: {
    gmail: {
      user: process.env.GOOGLE_MAIL_ID,
      password: process.env.GOOGLE_MAIL_PASSWORD,
    },
  },
};

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
