const express = require("express");
const Bookingrouter = express.Router();
const {
  booking,
  userBookings,
  cancelBooking,
  getAllBookings,
  confirm,
  rejectbooking,
} = require("../controllers/booking.controller");

Bookingrouter.route("/bookroom").post(booking);
Bookingrouter.route("/getbookingbyid").post(userBookings);
Bookingrouter.route("/cancelbooking").post(cancelBooking);
Bookingrouter.route("/getallbookings").get(getAllBookings);
Bookingrouter.route("/confirmbooking").post(confirm);
Bookingrouter.route("/rejectbooking").post(rejectbooking);

module.exports = Bookingrouter;
