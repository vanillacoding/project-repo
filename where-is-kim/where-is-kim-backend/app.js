import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import passport from 'passport';
import routers from './routers';
import socketCreator from './socket';
import { errorHandler, CustomError } from './lib/error';

dotenv.config();

const app = express();
const server = http.Server(app);

import './passport';
import './lib/utils';
import './moment.config';
import './db';

app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '10mb', extended: true }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(routers);

socketCreator(server);

app.use((req, res, next) => {
  next(new CustomError(404, 'Not Found'));
});

app.use((err, req, res, next) => {
  errorHandler(err, res);
});

module.exports = server;
