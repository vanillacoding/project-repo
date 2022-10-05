const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });
const api = require('./api')
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const app = express();
app.use(cors());

const User = require("./models/User");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.set('view engine', 'ejs');

app.post('/api/signin', cors(), (req, res) => {
  const newUser = new User();
  newUser.googleId = req.body.googleId;
  newUser.username = req.body.username;
  newUser.save();
});

app.post('/api/account/url', cors(), async (req, res, next) => {
  const addUrl = await User.findOne({ googleId: req.body.googleId });
  addUrl.google_drive_url = req.body.google_drive_url;

  try {
    if (req.body.google_drive_url && req.body.x && req.body.y) {
      res.send(await api.run(req.body.google_drive_url, req.body.x, req.body.y));
    } else {
      res.status(400).send('error occured');
    }
  } catch (err) {
    next(err);
  }

  addUrl.save();
});

app.post('/api/url', cors(), async (req, res, next) => {

  try {
    if (req.body.google_drive_url) {
      res.send(await api.getHeader(req.body.google_drive_url));
    } else {
      res.status(400).json({
        type: 'AssertionError',
        message: 'error occured'
      });
    };
  } catch (err) {
    next(err);
  }
});

app.post('/api/model/save', upload.none(), async (req, res) => {
  
});

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
