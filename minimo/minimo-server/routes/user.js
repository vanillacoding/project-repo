const router = require('express').Router();
const createError = require('http-errors');
const User = require('../models/User');

router.get('/', (req, res, next) => {
  res.json({ ok: true, data: { 'id': 1123123 }});
});

router.post('/', async (req, res, next) => {
  const { email, name, photoURL, idToken } = req.body;

  let user;

  try {
    user = await User.findOne({ email });
  } catch (error) {
    // TODO: add error;
    next(createError());
  }

  if (!user) {
    try {
      user = await User.create({
        email,
        name,
        photoURL,
      });

    } catch (error) {
      next(createError());
    }
  }

  res.json({ ok: true, data: user });
});

module.exports = router;
