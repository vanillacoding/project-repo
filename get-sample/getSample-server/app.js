// Connect Dotenv
require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const { CLIENT_URL } = require('./constants');

// Create server
const app = express();
console.log('CLIENT_URL', CLIENT_URL);
// Set cors
app.use(
  cors({
    origin: CLIENT_URL, // allow to server to accept request from different origin
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

// Connect Mongoose
mongoose.connect(process.env.MONGOOSE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongooseDB is connected!');
});

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middlewares
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SESSION],
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());

const passport = require('./lib/passport')(app);
const youtube = require('./lib/youtube');

app.use(cookieParser());

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/videos', require('./routes/videos'));
app.use('/api/dictionary', require('./routes/dictionary'));
app.use('/api/myWords', require('./routes/myWords'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
