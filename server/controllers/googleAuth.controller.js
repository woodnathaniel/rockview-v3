const passport = require('passport')
require('../auth')




const googleAuth = (req, res)=>{
  console.log('google auth api hit');
 const user = passport.authenticate('google', {scope: ['email' , 'profile']})
 console.log(user);

}

const googleAuthRedirect = (res, req) =>{
  console.log('callback api hit');
  passport.authenticate('google', { failureRedirect: '/failed-login' }),
  (req, res) =>{
    res.redirect('/')
  }
}

module.exports = { googleAuth, googleAuthRedirect };