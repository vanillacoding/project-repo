import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../../models/User';
import { THREE_DAY, WEEK } from '../constants/date';

export const checkLoggedIn: RequestHandler = (req, res, next) => {
  if (res.locals.decodedUser) next();
  else next(createError(401));
};

export const jwtMiddleware: RequestHandler = async (req, res, next) => {
  type DecodedToken = {
    _id: string;
    iat: number;
    exp: number;
  };

  const token = req.cookies.access_token;
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as DecodedToken;

    res.locals.decodedUser = {
      _id: decoded._id
    };

    if (Math.floor(decoded.exp * 1000) - Date.now() < THREE_DAY) {
      const user = await User.findById(decoded._id);
      const newToken = user!.generateToken();

      res.cookie('access_token', newToken, {
        maxAge: WEEK,
        httpOnly: true
      });
    }

    next();
  } catch (e) {
    next();
  }
};
