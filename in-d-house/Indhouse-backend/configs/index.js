require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  databaseUrl: process.env.MONGO_DB_URL,
  mongooseOptions: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: "indhouse",
  },
  awsConfig: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
  },
  musicPhotoBucket: process.env.AWS_MUSIC_PHOTO_BUCKET,
  userPhotoBucket: process.env.AWS_USER_PHOTO_BUCKET,
  corsOptions: {
    origin: true,
    credentials: true,
    httpOnly: true,
  },
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  saltRound: Number(process.env.SALT_ROUND),
};
