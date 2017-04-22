const User = require('../models/UserModel');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if(err || !user) return done(err, null);
    done(null, user);
  });
});

module.exports = (app, options) => {
  if(!options.successRedirect) {
    options.successRedirect = '/';
  } else if(!options.failureRedirect) {
    options.failureRedirect = '/login';
  }

  return {
    init: () => {
      const env = app.get('env');
      const config = options.providers;

      passport.use(new FacebookStrategy({
          clientID: config.facebook[env].appId,
          clientSecret: config.facebook[env].appSecret,
          callbackURL: (options.baseUrl || '') + "/auth/facebook/callback"
        },
        (accessToken, refreshToken, profile, done) => {
          const authId = 'facebook:' + profile.id;

          User.findOne({authId: authId}, (err, user) => {
            if(err || !user) return done(err, null);
            if(user) done(null, user);
              user = new User({
                authId: authId,
                username: profile.displayName,
                email: profile.email,
                role: 'customer',
                created: Date.now()
              });

              user.save((err) => {
                if(err) return done(err, null);
                done(null, user);
              });
          });
        }));
      app.use(passport.initialize());
      app.use(passport.session());
    },
    registerRoutes: () => {
      app.get('/auth/facebook', (req, res, next) => {
        console.log(req.query.redirect);
        if(req.query.redirect) req.session.authRedirect = req.query.redirect;
        passport.authenticate('facebook')(req, res, next);
      });
      app.get('/auth/facebook/callback',
              passport.authenticate('facebook', { failureRedirect: options.failureRedirect }),
              (req, res) => {
                let redirect = req.session.authRedirect;
                if(redirect) delete req.session.authRedirect;
                res.redirect(303, redirect || options.successRedirect);
              }
      );
    }
  };
};
