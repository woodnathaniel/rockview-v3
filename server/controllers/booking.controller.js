const bookingModel = require("../db.model/booking.model");
const roomModel = require("../db.model/rooms.model");
const nodemailer = require("nodemailer");
require('dotenv').config()

const NODEMAILER_PASS = process.env.NODEMAILER_PASS
const NODEMAILER_USER = process.env.NODEMAILER_USER

const transporter = nodemailer.createTransport({
  service: 'yahoo',
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  },
});

// Users making bookings api
const booking = async (req, res) => {
  const {
    roomid,
    roomtype,
    roomname,
    userid,
    contact,
    country,
    numberRooms,
    email,
    guest,
    children,
    occassion,
    fromdate,
    todate,
    totaldays,
    totalamount
  } = req.body;

  try {
    const newBooking = new bookingModel({
      roomid,
      roomtype,
      roomname,
      userid,
      contact,
      country,
      numberRooms,
      email,
      guest,
      children,
      occassion,
      fromdate,
      todate,
      totaldays,
      totalamount
    });

    console.log("Room booked API");

    const booking = await newBooking.save();
    console.log(booking);

    if (!booking) {
      console.log('Failed to save booking to the DB');
      return res.status(500).send("Failed to save booking to the DB");
    } else {
      try {
        const mailOptions = {
          from: {
            name: "Rockview Hospitality 👻",
            address: NODEMAILER_USER
          },
          to: email,
          subject: "Rockview Hospitality Booking Confirmation",
          text: "Hello world?",
          html: `
            <header>
              <h2>Thank you for choosing Rockview Hospitality</h2>
              <h4>...where you experience nature from home.</h4>
              <div>
                <p>
                  Thank you for your booking request with Rockview Hospitality. We have received your request and are currently processing it.
                  You will receive a confirmation message <b>in less than 24 hours</b> once your booking request is reviewed at the mail you provided. If we need any additional information from you, we will contact you shortly.
                  Thank you for choosing Rockview Hospitality. We look forward to the opportunity to serve you.
                </p>
                <h3>Here are your Booking Details</h3>
                <ul>
                  <li>Booking ID: ${booking._id}</li>
                  <li>User ID: ${userid}</li>
                  <li>Room Type: ${roomtype}</li>
                  <li>Room Name: ${roomname}</li>
                  <li>Guest Name: ${guest}</li>
                  <li>Children: ${children}</li>
                  <li>Occasion: ${occassion}</li>
                  <li>Check-in Date: ${fromdate}</li>
                  <li>Check-out Date: ${todate}</li>
                  <li>Total Days: ${totaldays}</li>
                  <li>Total Amount: ${totalamount} USD</li>
                </ul>
                <p>We look forward to your stay!</p>
              </div>
            </header>
          `,
        };

        const mailOptionstohotel = {
          from: {
            name: "Rockview Hospitality 👻",
            address: NODEMAILER_USER
          },
          to: NODEMAILER_USER,
          subject: "Rockview Hotel Booking Request",
          text: "Hello world?",
          html: `
            <header>
              <div>
                <p>
                  You have received a new booking request for Rockview Hospitality. Please find the details below:
                </p>
                <h3>Here are your Booking Details</h3>
                <ul>
                  <li>Booking ID: ${booking._id}</li>
                  <li>User ID: ${userid}</li>
                  <li>Room Type: ${roomtype}</li>
                  <li>Room Name: ${roomname}</li>
                  <li>Guest Name: ${guest}</li>
                  <li>Children: ${children}</li>
                  <li>Occasion: ${occassion}</li>
                  <li>Check-in Date: ${fromdate}</li>
                  <li>Check-out Date: ${todate}</li>
                  <li>Total Days: ${totaldays}</li>
                  <li>Total Amount: ${totalamount} USD</li>
                </ul>
                <p><b>Kindly review the booking request and proceed with the necessary steps for approval. Please let the guest know if any additional information is required.</b></p>
              </div>
            </header>
          `,
        };

        await transporter.sendMail(mailOptions);
        await transporter.sendMail(mailOptionstohotel);
        res.status(200).json({ message: 'Booking confirmed and email sent' });
        console.log('Mail sent successfully');

      } catch (error) {
        console.error('Error sending mail:', error);
        return res.status(500).send('Error sending email');
      }
    }

  } catch (error) {
    console.error('Failed to book API:', error);
    return res.status(500).json({ error: "Failed to register user", details: error.message });
  }
};

// Getting user bookings by user using userID
const userBookings = async (req, res) => {
  const { id } = req.body;
  try {
    const bookings = await bookingModel.find({ userid: id });
    res.status(200).json(bookings);
    console.log(bookings);
    console.log("Getting user bookings successful");
  } catch (error) {
    console.error('Failed to get user bookings:', error);
    console.log("Getting user bookings failed");
    res.status(500).json({ error: 'Failed to get user bookings', details: error.message });
  }
};

// Retrieving all bookings api
const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find();
    res.status(200).json(bookings);
    console.log("All bookings retrieved successfully");
  } catch (error) {
    console.error('Failed to get all bookings:', error);
    res.status(500).json({ error: 'Failed to retrieve all bookings', details: error.message });
  }
};

// User cancelling booking api
const cancelBooking = async (req, res) => {
  const { bookid, reason, email } = req.body;

  try {
    const cancel = await bookingModel.findByIdAndUpdate(
      { _id: bookid },
      { status: "cancelled" }
    );

    if (cancel) {
      const mailOptions = {
        from: {
          name: "Rockview Hospitality 👻",
          address: NODEMAILER_USER
        },
        to: cancel.email,
        subject: "Booking Cancellation Confirmation",
        text: "Hello world?",
        html: `
          <header>
            <h2>Thank you for choosing Rockview Hospitality</h2>
            <h4>...where you experience nature from home.</h4>
            <div>
              <h3>Your Booking Request Review Result</h3>
              <p>
                Thank you for informing us about the cancellation of your booking request with Rockview Hospitality. We understand that plans can change, and we appreciate you letting us know.
                If there's anything we can do to assist you in the future, please don't hesitate to reach out. We hope to have the opportunity to serve you another time.
                If this action was made unintentionally, you can make the booking request again: <a href="https://rockviewhotel.vercel.app/booking">Click Here To Make Booking Request</a>
                Thank you for considering Rockview Hospitality.
              </p>
              <div>
                <h3>Booking Details</h3>
                <ul>
                  <li><b>Booking Status: ${cancel.status}</b></li>
                  <li>Booking ID: ${cancel._id}</li>
                  <li>User ID: ${cancel.userid}</li>
                  <li>Room Type: ${cancel.roomtype}</li>
                  <li>Number of Rooms Booked: ${cancel.numberRooms}</li>
                  <li>Check-in Date: ${cancel.fromdate}</li>
                  <li>Check-out Date: ${cancel.todate}</li>
                  <li>Total Days: ${cancel.totaldays} Days</li>
                  <li>Total Amount: ${cancel.totalamount} USD</li>
                </ul>
              </div>
            </div>
          </header>
        `,
      };

      const mailOptionstohotel = {
        from: {
          name: "Rockview Hospitality 👻",
          address: NODEMAILER_USER
        },
        to: NODEMAILER_USER,
        subject: "Booking Request Cancelled",
        text: "Hello world?",
        html: `
          <header>
            <div>
              <h3>Booking Request Cancelled</h3>
              <p>
                A booking request with ID: ${cancel._id} has been cancelled by the guest. The details of the booking were as follows:
                <ul>
                  <li>Booking ID: ${cancel._id}</li>
                  <li>Guest Name: ${cancel.guest}</li>
                  <li>Contact Information: ${cancel.email}, ${cancel.contact}</li>
                  <li>Reason for Cancellation: ${reason}</li>
                </ul>
                Please update our records accordingly and take any necessary actions as per our cancellation policies.
                Thank you.
              </p>
            </div>
          </header>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(mailOptionstohotel);
        res.status(200).json({ message: 'Booking cancelled and emails sent' });
        console.log('Mail sent successfully');
      } catch (error) {
        console.error('Error sending mail:', error);
        res.status(500).json({ error: 'Error sending email', details: error.message });
      }
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }

  } catch (error) {
    console.error('Failed to cancel booking:', error);
    res.status(500).json({ error: 'Failed to cancel booking', details: error.message });
  }
};

// Confirm bookings API
const confirm = async (req, res) => {
  const { bookid } = req.body;

  try {
    const confirm = await bookingModel.findByIdAndUpdate(
      { _id: bookid },
      { status: "approved" }
    );

    if (confirm) {
      const mailOptions = {
        from: NODEMAILER_USER,
        to: confirm.email,
        subject: "Booking Confirmation",
        text: "Hello world?",
        html: `
          <header>
            <h2>Thank you for choosing Rockview Hospitality</h2>
            <h4>...where you experience nature from home.</h4>
            <div>
              <h3>Your Booking Request Review Result</h3>
              <p>
                Thank you for your booking request with Rockview Hospitality. We are pleased to inform you that your request <b>has been APPROVED</b>.
                Your reservation is confirmed for the <b>Check-In date: ${confirm.fromdate}</b> at Rockview Hospitality. We look forward to welcoming you and providing you with a great experience.
                If you have any special requests or need further assistance, please let us know. We're here to help!
                Thank you for choosing Rockview Hospitality.
              </p>
              <div>
                <h3>Booking Details</h3>
                <ul>
                  <li>Booking ID: ${confirm._id}</li>
                  <li>User ID: ${confirm.userid}</li>
                  <li>Room Type: ${confirm.roomtype}</li>
                  <li>Number of Rooms Booked: ${confirm.numberRooms}</li>
                  <li>Check-In Date: ${confirm.fromdate}</li>
                  <li>Check-Out Date: ${confirm.todate}</li>
                  <li>Total Days: ${confirm.totaldays} Days</li>
                  <li>Total Amount: ${confirm.totalamount} USD</li>
                </ul>
              </div>
              <p>We look forward to your stay!</p>
            </div>
          </header>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Booking confirmed and email sent' });
      } catch (error) {
        console.error('Error sending confirmation mail:', error);
        res.status(500).json({ error: 'Error sending confirmation email', details: error.message });
      }
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }

  } catch (error) {
    console.error('Failed to confirm booking:', error);
    res.status(500).json({ error: 'Failed to confirm booking', details: error.message });
  }
};

// Rejecting booking requests API
const rejectbooking = async (req, res) => {
  const { bookid, reason, email } = req.body;

  try {
    const reject = await bookingModel.findByIdAndUpdate(
      { _id: bookid },
      { status: "rejected" }
    );

    if (reject) {
      const mailOptions = {
        from: {
          name: "Rockview Hospitality 👻",
          address: NODEMAILER_USER
        },
        to: email,
        subject: "Booking Request Review Result",
        text: "Hello world?",
        html: `
          <header>
            <h2>Thank you for choosing Rockview Hospitality</h2>
            <h4>...where you experience nature from home.</h4>
            <div>
              <h3>Your Booking Request Review Result</h3>
              <p>
                Thank you for your interest in Rockview Hospitality's services. We appreciate you considering us for your needs.
                Unfortunately, we are unable to accommodate your booking request at this time due to <h3 style="color: red; font-size: 15px;"><b>${reason}</b></h3>. We apologize for any inconvenience this may have caused.
                We hope to have the opportunity to serve you in the future. If you have any questions or would like assistance with alternative arrangements, please feel free to contact us.
                Thank you for your understanding.
              </p>
            </div>
          </header>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Booking rejected and email sent' });
        console.log('Mail sent successfully');
      } catch (error) {
        console.error('Error sending rejection mail:', error);
        res.status(500).json({ error: 'Error sending rejection email', details: error.message });
      }
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }

  } catch (error) {
    console.error('Failed to reject booking:', error);
    res.status(500).json({ error: 'Failed to reject booking', details: error.message });
  }
};

module.exports = {
  booking,
  userBookings,
  cancelBooking,
  getAllBookings,
  confirm,
  rejectbooking,
};
