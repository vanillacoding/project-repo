if (process.env.NODE_ENV === 'development') {
  const dotenv = require('dotenv');
  dotenv.config();
}

const dbUrl = process.env.DB_URL;
const mongoose = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

module.exports = { dbUrl, mongoose };
