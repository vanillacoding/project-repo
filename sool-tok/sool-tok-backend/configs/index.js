require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  tokenSecretKey: process.env.TOKEN_SECRET_KEY,
  databaseURL: process.env.MONGODB_URL,
  mongooseOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'sool-tok',
  },
  corsOptions: {
    origin: 'https://www.sool-tok.live',
    optionsSuccessStatus: 200,
  },
};
