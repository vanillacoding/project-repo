const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const useragent = require('express-useragent');
const index = require('./routes/index');
const { NotFoundError } = require('./lib/error');

const app = express();

app.use(compression());
app.use(cookieParser());
app.use(useragent.express());

app.use(
  cookieSession({
    name: 'session',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['adsfasdfsadf'],
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api', index);

app.use(express.static('dist'));

app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use((err, req, res, next) => {
  res.status(err.state || 500);

  if (err.status === 404) {
    return res.redirect('/');
  }

  res.json(new NotFoundError());
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

module.exports = app; // FOR TEST PURPOSE
