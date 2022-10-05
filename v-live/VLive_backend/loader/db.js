const mongoose = require('mongoose');
const { databaseURL } = require('../configs');

function connectMongoDB() {
  const db = mongoose.connection;
  mongoose.connect(databaseURL);

  require('../models/Character');
  require('../models/Channel');
  require('../models/Episode');
  require('../models/User');

  db.on('error', function () {
    console.log('Disconnected to database...');
    mongoose.disconnect();
  });

  db.once('open', function () {
    console.log('Connected to database...');
  });
}

module.exports = connectMongoDB;
