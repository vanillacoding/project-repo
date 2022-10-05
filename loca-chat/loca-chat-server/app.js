require('dotenv').config();
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketIO = require('socket.io');
const port = process.env.PORT || '3000';
const mongoose = require('mongoose');
const chat = require('./routes/chat');
const error = require('./lib/error');
const socket = require('./socket');
const io = socketIO(server);
const cors = require('cors');
const bodyParser = require('body-parser');

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('mongo connected'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

socket(io);
app.use('/api/chats', chat);
app.use((req, res) => {
  const serverError = new error.GeneralError();

  res.send({ result: 'ng', errorMessage: serverError.displayMessage });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
