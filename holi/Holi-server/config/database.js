require('dotenv').config();
const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect(process.env.DB, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

db.on('error', () => console.log('Connection error'));
db.once('open', () => console.log('Conneted mongoDB'));
