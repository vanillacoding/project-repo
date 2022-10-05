const db = require('mongoose');

module.exports = () => {
  db.set('useFindAndModify', false);
  db.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

db.connection
  .on('error', err => console.error(`connection error: ${err}`))
  .once('open', () => console.log('database connected'));
