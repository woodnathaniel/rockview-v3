const authRouter = require('express').Router();
const passport = require('passport')
 

authRouter.get("/google", passport.authenticate("google",{scope: ["email", "profile"]}));

authRouter.get('/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/' }), (req, res) => {
  res.redirect('http://localhost:3000/'); // Redirect to React app
});

authRouter.get("/login/success", (req, res)=>{
  if(req.user){
   res.status(200).json({
     error: false,
     message: "Successfully Log In",
     user: req.user,
   })
  }else{
   res.status(403).json({
     error: true,
     message: "Not Authorized"
   })
  }
 })

 authRouter.get('/failed_authentication', (req, res)=>{
  res.send('failed authentication')
 })
 

authRouter.get("/login/failed", (req, res)=>{
  res.status(401).json({
    error: true,
    message: "Logo in failure"
  })
})



// authRouter.get("/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/",
//     failureRedirect: "/login/failed"
//   })
// );


authRouter.get("/logout", (req, res)=>{
  req.logout();
  res.redirect('/')
});

module.exports = authRouter