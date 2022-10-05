import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../model/user';
import { CustomError } from '../lib/error';

export const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user) => {
    try {
      if (err) {
        return next(err);
      }

      if (!user) {
        throw new CustomError(403, 'User does not exists');
      }

      const loggedInUser = await User.findById(user.id).populate('teams');

      req.login(loggedInUser, { session: false }, (error) => {
        if (error) return next(error);

        const payload = { id: loggedInUser.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.json({ result: { token, loggedInUser } });
      });
    } catch (error) {
      next(error);
    }
  })(req, res);
};

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const profile = req.file ? req.file.location : '';
    const user = new User({
      username,
      email,
      profile
    });

    await User.register(user, password);

    res.json({ result: 'ok' });
  } catch (error) {
    next(error);
  }
};
