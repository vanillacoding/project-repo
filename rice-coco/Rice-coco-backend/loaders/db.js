const mongoose = require('mongoose');
const config = require('../config');

const dbLoader = () => {
  mongoose.connect(config.dbUrl, config.mongoose);

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => console.log('db connect!'));
};

module.exports = dbLoader;
