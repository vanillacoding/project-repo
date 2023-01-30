const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log('DB Connected');
  } catch (err) {
    console.error('The error is : ', err);
  }
};

module.exports = dbConnect;
