const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const usersModelDb = require('./db.model/users.model');



  passport.use(new GoogleStrategy({
      clientID: '475901348280-7fmergkakj2rr08icbfu26c06n8fdsn4.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: "https://rockviewhospitalities-api.vercel.app/auth/google/callback",
      scope: ["profile", "email"]
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


