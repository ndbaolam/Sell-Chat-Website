const passport = require('passport');
const session = require('express-session');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (app) => {
    const config = 
    {
        'clientID':  process.env.FACEBOOK_APP_ID, // your App ID
	    'clientSecret':  process.env.FACEBOOK_APP_SECRET, // your App Secret
	    'callbackURL':  process.env.FACEBOOK_CALLBACK_URL
    };

    app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: 'SECRET'
      }));
      
      app.use(passport.initialize());
      app.use(passport.session());
      
      passport.serializeUser(function (user, cb) {
        cb(null, user);
      });
      
      passport.deserializeUser(function (obj, cb) {
        cb(null, obj);
      });
      
      passport.use(new FacebookStrategy({
          clientID: config.clientID,
          clientSecret: config.clientSecret,
          callbackURL: config.callbackURL
        }, function (accessToken, refreshToken, profile, done) {
          return done(null, profile);
        }
      ));
}