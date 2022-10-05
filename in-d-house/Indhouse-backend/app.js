const express = require("express");
const createError = require("http-errors");
const mongoose = require("mongoose");

const { port } = require("./configs");
const initLoaders = require("./loaders");

const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const musicsRouter = require("./routes/musics");
const genresRouter = require("./routes/genre");
const artistsRouter = require("./routes/artists");

const app = express();

initLoaders(app);

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/musics", musicsRouter);
app.use("/genres", genresRouter);
app.use("/artists", artistsRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  if (process.env.NODE_ENV === "production") {
    console.log(err);
    if (err instanceof mongoose.Error) err = createError(500);
    err.stack = null;
  }

  res
    .status(err.status || 500)
    .json(err);
});

app.listen(port || 5000, () => {
  console.log(`Server is running on ${port || 5000}`);
});

module.exports = app;
