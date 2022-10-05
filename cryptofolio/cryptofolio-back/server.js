const path = require("path");
const dotenv = require("dotenv");
dotenv.config({
  path: path.join(__dirname, ".env"),
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const server = require("http").Server(app);
const port = process.env.PORT || 5000;
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/authRouter");
const coinRouter = require("./routes/coinRouter");
const cryptofolioRouter = require("./routes/cryptofolioRouter");

const mongoURL = process.env.MONGO_URL.replace(
  "<PASSWORD>",
  process.env.MONGO_PASSWORD
);

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection success");
  })
  .catch((err) => {
    console.log(`ERROR: ${err.name}, ${err.message}`);
  });
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  req.setTimeout(0); // no timeout for all requests, your server will be DoS'd
  next();
});

app.get("/", (req, res, next) =>
  res.status(200).json({
    message: "success",
  })
);
app.get("/favicon.ico", (req, res, next) => res.status(204));
app.use("/api/auth", authRouter);
app.use("/api/cryptofolio", cryptofolioRouter);
app.use("/api/coin", coinRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");

  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).json({
    result: "error",
  });
});

server.listen(port, () => {
  console.log(`Listening to PORT: ${port}`);
});
