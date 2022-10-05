import express from 'express';
import * as authCtrl from './auth.ctrl';

const auth = express.Router();

auth.get('/user', authCtrl.loadUser);

auth.post('/signup', authCtrl.signup);

auth.post('/login', authCtrl.login);

auth.post('/logout', authCtrl.logout);

export default auth;
