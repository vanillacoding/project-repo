import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import compression from 'compression';
import hpp from 'hpp';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import createError, { HttpError } from 'http-errors';
import { jwtMiddleware } from './lib/middlewares/auth';
import apiRouter from './routes/api';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_ATLAS_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.once('open', () => console.log('✔️  MongoDB Connected'));
db.on('error', () => console.error('❌  MongoDB Connection Error '));

app.use(cors({ 
  credentials: true, 
  origin: true,
  exposedHeaders: 'Last-Page'
}));
app.use(compression());
app.use(hpp());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(jwtMiddleware);

app.use('/api', apiRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  res.status(err.status || 500);
  res.json(err);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    console.log('✔️  Listening on port', process.env.PORT);
  });
}

export default app;
