const bookingModel = require("../db.model/booking.model");
const roomModel = require("../db.model/rooms.model");
const nodemailer = require("nodemailer");




//Users making bookings api
const booking = async (req, res) => {
  const {
    roomid,
    roomtype,
    roomname,
    userid,
    contact,
    email,
    guest,
    children,
    occassion,
    fromdate,
    todate,
    totaldays,
    totalamount,
  } = req.body;
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "nathanielwood002@gmail.com",
      pass: "jlvc dxfh fppt xavj",
    },
  });

  try {
    const newBooking = new bookingModel({
      roomid: roomid,
      roomtype: roomtype,
      roomname: roomname,
      userid: userid,
      contact: contact,
      email: email,
      guest: guest,
      children: children,
      occassion: occassion,
      fromdate: fromdate,
      todate: todate,
      totaldays: totaldays,
    });

    console.log("Room booked API");

    const booking = await newBooking.save();
    
    if (!booking) {
      console.log('Failed to save booking to the DB');
      return res.status(500).send("Failed to save booking to the DB");
    }

    const roomtemp = await roomModel.findByIdAndUpdate(
      { _id: roomid },
      {
        $set: {
          currentbookings: {
            bookingid: booking._id,
            userid: userid,
            fromdate: booking.fromdate,
            todate: booking.todate,
            status: booking.status,
          },
        },
      },
      { new: true }
    );

    const mailOptions = {
      from: {
        name: "Nathaniel Wood 👻", 
        address: 'nathanielwood002@gmail.com'
      },
      to: email, // Ensure `email` is correctly formatted if it's an array
      subject: "Nodejs mailer ✔",
      text: "Hello world?", 
      html: "<b>Thank you for choosing us</b>", 
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Mail sent successfully');
      return res.status(200).send("Booking registered successfully");
    } catch (error) {
      console.error('Error sending mail:', error);
      return res.status(500).send('Error sending email');
    }

  } catch (error) {
    console.error('Failed to book API:', error);
    return res.status(500).json({ error: "Failed to register user", details: error.message });
  }
};


//Getting user bookings by user using userID
const userBookings = async (req, res) => {
  const { id } = req.body;
  try {
    const bookings = await bookingModel.find({ userid: id });
    res.status(200).json(bookings);
    console.log(bookings);
    console.log("getting user bookings successful api");
  } catch (error) {
    console.log(error);
    console.log("getting user bookings failed api");
  }
};


//Retrieving all bookings api
const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find();
    res.status(200).json(bookings);
    console.log("all bookings got successful api");
  } catch (error) {
    console.log(error);
    console.log("getting all bookings failed api");
  }
};



//User cancelling booking api
const cancelBooking = async (req, res) => {
  const { bookid } = req.body;

  try {
    const cancel = await bookingModel.findByIdAndUpdate(
      { _id: bookid },
      { status: "cancelled" }
    );
    res.status(200).json(cancel);
    console.log("successful cancel api");
    // const status = await roomModel.
  } catch (error) {
    console.log(error);
    console.log("failed cancel api");
  }
};

//CONFIRM BOOKINGS API

const confirm = async (req, res) => {
  const { bookid } = req.body;
  try {
    const confirm = await bookingModel.findByIdAndUpdate(
      { _id: bookid },
      { status: "approved" }
    );
    res.status(200).json(confirm);
    console.log("successful approved api");
  } catch (error) {
    console.log(error);
    console.log("failed approval api");
  }
};

const rejectbooking = async (req, res) => {
  const { bookid } = req.body;
  try {
    const reject = await bookingModel.findByIdAndUpdate(
      { _id: bookid },
      { status: "rejected" }
    );
    res.status(200).json(reject);
    console.log("successful rejected api");
  } catch (error) {
    console.log(error);
    console.log("failed rejected api");
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


