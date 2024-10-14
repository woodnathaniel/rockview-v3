const express = require('express');
const { userData, loginData, getAllUsers, resetPassword, resetPasswordCheck } = require('../controllers/users.controller');
const userRouter = express.Router();

userRouter.route('/register').post(userData);
userRouter.route('/login').post(loginData);
userRouter.route('/getallusers').get(getAllUsers)
userRouter.route('/rockview/resetpassword').post(resetPassword)
userRouter.route('/rockview/resetpasswordcheck').post(resetPasswordCheck)
module.exports = userRouter;