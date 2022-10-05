require('dotenv').config();
require('./config/mongoose');

const http = require('http');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const socketIo = require('socket.io');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const waitingRouter = require('./routes/waiting');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

require('./lib/socket')(io);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/waiting', waitingRouter);
app.use('/', (req, res) => res.status(200).json({ result: 'ok' }));

app.use((req, res, next) => {
  next(new Error('invalid url'));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({ error: 'invalid url' });
});

server.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`));

module.exports = app;
