const mongoose = require('mongoose');
const { MONGO_URI } = require('./config/index');

try {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('mongoDB connected');
} catch (err) {
  next(err);
}
