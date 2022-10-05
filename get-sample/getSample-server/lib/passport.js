require('dotenv').config();
const google = require('../config/google.json');
const User = require('../models/User');

module.exports = function(app) {
  const passport = require('passport');
  const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_WEB_CLIENT_ID,
        clientSecret: process.env.GOOGLE_WEB_CLIENT_SECRET,
        callbackURL: `${
          process.env.NODE_ENV === 'development'
            ? google.web.redirect_uris[0]
            : google.web.redirect_uris[1]
        }`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findOrCreate({
            google_id: profile.id,
            name: profile.displayName,
            profile_image_url: profile.photos[0].value,
          });
          done(null, user.doc);
        } catch (err) {
          done(err);
        }
        return passport;
      }
    )
  );
};
