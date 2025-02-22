const express = require('express');
const googleAuthRouter = express.Router();
const {googleAuth, googleAuthRedirect } = require('../controllers/googleAuth.controller')


googleAuthRouter.route('/auth/google').get(googleAuth);
googleAuthRouter.route('/auth/google/callback').get(googleAuthRedirect)


module.exports = googleAuthRouter