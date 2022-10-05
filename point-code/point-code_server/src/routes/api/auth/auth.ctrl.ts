import { Request, Response, RequestHandler } from 'express';
import Joi from '@hapi/joi';
import createError from 'http-errors';
import { WEEK } from '../../../lib/constants/date';
import User from '../../../models/User';

export const loadUser: RequestHandler = async (req, res, next) => {
  const { decodedUser }: { decodedUser: { _id: string } } = res.locals;

  if (!decodedUser) {
    next(createError(401));
  }

  try {
    const user = await User.findById(decodedUser._id);
    res.json(user!.serialize());
  } catch (e) {
    next(createError(500));
  }
};

export const signup: RequestHandler = async (req, res, next) => {
  type RequestBody = {
    name: string;
    email: string;
    password: string;
    confirmation: string;
  };

  const schema = Joi.object().keys({
    name: Joi.string()
      .min(3)
      .max(15)
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20),
    confirmation: Joi.ref('password')
  }).with('password', 'confirmation');

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return next(createError(400, validationResult.error.details[0].message));
  }

  try {
    const { name, email, password }: RequestBody = req.body;
    const existingEmail = await User.findByEmail(email);
    const existingName = await User.findByName(name);

    if (existingEmail || existingName) {
      return next(createError(409));
    }

    const newUser = new User({ name, email });
    await newUser.setPassword(password);
    await newUser.save();

    const token = newUser.generateToken();
    res.cookie('access_token', token, {
      maxAge: WEEK,
      httpOnly: true
    });

    res.json(newUser.serialize());
  } catch (e) {
    next(createError(500));
  }
};

export const login: RequestHandler = async (req, res, next) => {
  type RequestBody = {
    email: string;
    password: string;
  };

  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required()
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return next(createError(400, validationResult.error.details[0].message));
  }

  try {
    const { email, password }: RequestBody = req.body;
    const user = await User.findByEmail(email);

    if (!user) {
      return next(createError(401));
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return next(createError(401));
    }

    const token = user.generateToken();
    res.cookie('access_token', token, {
      maxAge: WEEK,
      httpOnly: true
    });

    res.json(user.serialize());
  } catch (e) {
    next(createError(500));
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie('access_token', '');
  res.status(204).end();
};
