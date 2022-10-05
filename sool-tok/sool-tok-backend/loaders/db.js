const mongoose = require('mongoose');

const { databaseURL, mongooseOptions } = require('../configs');

const dbLoader = () => {
  mongoose.connect(databaseURL, mongooseOptions);

  mongoose.connection.on('error', () => console.error('connection error'));
  mongoose.connection.once('open', () => console.log('mongoose is connected'));
};

module.exports = dbLoader;
