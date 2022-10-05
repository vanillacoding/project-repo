const express = require('express');
const router = express.Router();
const passport = require('passport');
const { CLIENT_URL, GOOGLE_API_SCOPE } = require('../constants');

router.get(
  '/google',
  passport.authenticate('google', {
    scope: [GOOGLE_API_SCOPE.PLUS],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google'),
  (req, res, next) => {
    console.log(req.user);
    res.redirect(CLIENT_URL);
  }
);

router.get('/google/login/success', (req, res, next) => {
  console.log('Call LOGIN!');
  console.log('User', req.user);
  if (req.user) {
    res.header('Access-Control-Allow-Origin', CLIENT_URL);
    res.status(200).json({
      result: 'login success',
      user: req.user,
    });
  } else {
    res.status(204);
  }
});

router.get('/google/logout', (req, res) => {
  console.log('Call LOGOUT!');
  console.log('User before LOGOUT', req.user);
  req.logout();
  res.redirect(CLIENT_URL);
});

module.exports = router;
