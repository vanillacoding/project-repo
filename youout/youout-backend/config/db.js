const mongoose = require('mongoose');

const { ATLAS_DB_ID, ATLAS_DB_PASSWORD } = process.env;
const dbUri = `mongodb+srv://${ATLAS_DB_ID}:${ATLAS_DB_PASSWORD}@youout.urfkx.mongodb.net/youout?retryWrites=true&w=majority`;

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.error('connection error: ' + error));
db.once('open', () => console.log('connected to database'));
