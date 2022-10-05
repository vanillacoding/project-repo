const mongoose = require('mongoose');

function connection() {
  const { MONGODB_URL } = process.env;
  mongoose.connect(MONGODB_URL);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', console.log.bind(console, 'Connected to database..'));
}

module.exports = connection;
