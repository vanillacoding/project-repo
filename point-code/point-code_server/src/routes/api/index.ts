import express from 'express';
import authRouter from './auth';
import problemsRouter from './problems';

const api = express.Router();

api.use('/auth', authRouter);
api.use('/problems', problemsRouter);

export default api;
