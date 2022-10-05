const mongoose = require('mongoose');

function dbLoader() {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', console.log.bind(console, 'Connected to database..'));
}

module.exports = dbLoader;
