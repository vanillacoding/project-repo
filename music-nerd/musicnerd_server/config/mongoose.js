const mongoose = require('mongoose');

const url = process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'production' ?
  process.env.MONGODB_URI : process.env.MONGODB_URI_TEST;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'production') {
  mongoose.connection.on('error', () => console.error('Connection Error!'));
  mongoose.connection.once('open', () => console.log('Connected!'));
} else if (process.env.NODE_ENV === 'test') {
  mongoose.connection.on('error', () => console.error('Connection Error!'));
  mongoose.connection.once('open', () => console.log('Connected to test db!'));
}
