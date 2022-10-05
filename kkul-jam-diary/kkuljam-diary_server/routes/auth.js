const express = require('express');
const createError = require('http-errors');
const auth = express.Router();
const User = require('../models/User');

auth.post('/login', async (req, res, next) => {
  const { email, name } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = await new User({
        email,
        name
      }).save();
    }
    res.json(user);
  } catch(err) {
    console.log(err);
    next(createError(500, '일시적인 오류가 발생하였습니다.'));
  }
});

module.exports = auth;
