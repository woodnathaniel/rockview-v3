const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const usersModelDb = require('./db.model/users.model');



  passport.use(new GoogleStrategy({
      clientID: '737637812674-kapot1fba8nmf9qvjovv0o2hcr6asmu3.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: "http://localhost:5000/auth/google/callback",
      scope: ["profile", "email"]
    },
     async (accessToken, refreshToken, profile, cb) => {
       console.log(profile);
      //  cb(false, {strategy: 'google' , accessToken , refreshToken , ...profile})
        return cb()
      }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((user, done) => {
        done(null, user);
  });


