const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_ATLAS_URI, {
  dbName: 'ggot',
  useNewUrlParser: true,
  useCreateIndex:true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', () => console.log('mongoDB-error'));
db.once('open', () => console.log('mongoDB-connected'));
