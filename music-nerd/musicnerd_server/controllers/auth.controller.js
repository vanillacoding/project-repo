const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userFindByEmail = await User.findOne({ email });
    const userFindByUsername = await User.findOne({ username });

    if (userFindByEmail) {
      return res.status(400).json({
        errorMessage: 'Email address already taken.'
      });
    }

    if (userFindByUsername) {
      return res.status(400).json({
        errorMessage: 'Username already taken.'
      });
    }

    bcrypt.hash(password, 12, async (err, hashedPassword) => {
      if (err) {
        console.error('bcrypt hash error', err);
        return res.status(500).json({
          errorMessage: 'Server error. Please try again.'
        });
      }

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        thumbnail_url: `${process.env.AMAZON_S3_URI}/user_profile/profile${Math.floor(Math.random()*9)}.png`,
        favorite_artists: [],
        favorite_tracks: [],
        play_log: []
      });

      const payload = { userId: newUser._id };

      jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        { expiresIn: 1000 * 60 * 60 },
        (err, token) => {
          if (err) {
            console.error('jwt sign error', err);
            return res.status(500).json({
              errorMessage: 'Server error. Please try again.'
            });
          }

          res.status(200).end();
        }
      );
    });
  } catch (err) {
    console.error('Sign up error', err);
    res.status(500).json({
      errorMessage: 'Server error. Please try again.'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        errorMessage: 'Cannot find user.'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        errorMessage: 'Invalid password.'
      });
    }

    const payload = { userId: user._id };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: 1000 * 60 * 60 },
      (err, token) => {
        if (err) {
          console.error('jwt sign error', err);
          return res.status(500).json({
            errorMessage: 'Server error. Please try again.'
          });
        }

        res.status(200).json({ token, userId: user._id });
      }
    );
  } catch (err) {
    console.error('login error', err);
    res.status(500).json({
      errorMessage: 'Server error. Please try again.'
    });
  }
};

exports.deleteTestUser = async (res, req) => {
  await User.deleteOne({ username: 'testuser' });
};
