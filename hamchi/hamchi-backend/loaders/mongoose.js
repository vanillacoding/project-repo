const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  dbName: process.env.MONGODB_NAME,
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Connected to mongoDB server'));

module.exports = db;
