const express = require('express');
const ContactRouter = express.Router();
const {contact} = require('../controllers/contact.controller')

ContactRouter.route('/contact').post(contact)

module.exports = ContactRouter