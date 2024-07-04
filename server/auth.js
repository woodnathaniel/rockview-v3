const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const usersModelDb = require('./db.model/users.model');

module.exports = function (){

  passport.use(new GoogleStrategy({
      clientID: '475901348280-mpdeki5b8brn8r8jlmnn28cplunc3vkq.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, cb) => {
       console.log(profile);
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((user, done) => {
        done(null, user);
  });
}

