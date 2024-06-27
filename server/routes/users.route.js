const express = require('express');
const { userData, loginData, getAllUsers } = require('../controllers/users.controller');
const userRouter = express.Router();

userRouter.route('/register').post(userData);
userRouter.route('/login').post(loginData);
userRouter.route('/getallusers').get(getAllUsers)
module.exports = userRouter;