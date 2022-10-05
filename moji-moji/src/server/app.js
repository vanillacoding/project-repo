const http = require('http');
// const https = require('https');
// const fs = require('fs');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
// const server = https.createServer(
//   {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('certificate.pem'),
//     requestCert: true,
//     rejectUnauthorized: false,
//   },
//   app
// );
const io = require('socket.io')(server);
require('./sockets')(io);

app.use(cors());
app.use(logger('dev'));
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './dist/' });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(process.env.PORT || 80, () => console.log('Listening on port 80!'));
