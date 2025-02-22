const express = require('express');
const {getData, getRoomById, updateAvailability} = require('../controllers/getdata.controller');
const router = express.Router();

router.route('/getallrooms').get( getData)
router.route('/getroombyid').post(getRoomById)
router.route('/updateroomavailabilitybyid').post(updateAvailability)

module.exports = router