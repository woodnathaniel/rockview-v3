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

  // if (
  //   !roomid || !roomtype || !userid || !contact || !country || !numberRooms ||
  //   !email || !guest || !fromdate || !todate || !totaldays || totalamount === undefined
  // ) {
  //   return res.status(400).json({ error: "All required fields must be provided" });
  // }
  
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
      country: country,
      numberRooms: numberRooms,
      email: email,
      guest: guest,
      children: children,
      occassion: occassion,
      fromdate: fromdate,
      todate: todate,
      totaldays: totaldays,
      totalamount: totalamount
    });

    console.log("Room booked API");

    const booking = await newBooking.save();
    console.log(booking)
    
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
        name: "Rockview Hospitalities 👻", 
        address: 'nathanielwood002@gmail.com'
      },
      to: email, // Ensure `email` is correctly formatted if it's an array
      subject: "Rockview Hospitalities Booking Confirm message",
      text: "Hello world?", 
      html: `
        <header>
          <h2>Thank you for choosing Rockview Hopitalies</h2><h4>...where you experience nature from home.</h4>
          <div>
            <h3>Here are  your Bookings Details</h3>
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
              <li>Total Amount: ${totalamount}</li>
            </ul>S
            <div>
             <h3>Please Take Note:</h3>
              <h4>currency of total amount is in Ghana Cedis</h4>
            </div>
            <p>We look forward to your stay!</p>
          </div>
        </header>
      `, 
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


// Rejecting booking requests API

const rejectbooking = async (req, res) => {
  const { bookid, reason, email} = req.body;

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

  const mailOptions = {
    from: {
      name: "Rockview Hospitalities 👻", 
      address: 'nathanielwood002@gmail.com'
    },
    to: email, // Ensure `email` is correctly formatted if it's an array
    subject: "Rockview Hospitalities Booking Request Review message",
    text: "Hello world?", 
    html: `
      <header>
        <h2>Thank you for choosing Rockview Hopitalies</h2><h4>...where you experience nature from home.</h4>
        <div>
          <h3>Your Booking Request Review Result</h3>
          <p>
            Thank you for your interest in Rockview Hopitalities Services. We appreciate you considering us for your needs.
            Unfortunately, we are unable to accommodate your booking request at this time due to <h3 style{{Color: 'red', fontSize: '15px'}}> <b> ${reason} <b/></h3>. We apologize for any inconvenience this may cause.
            We hope to have the opportunity to serve you in the future. If you have any questions or would like assistance with alternative arrangements, please feel free to contact us.
            Thank you for your understanding.
          </p>
          <div style{{}}>
           <h3>Please Take Note:</h3>
            <h4>currency of total amount is in Ghana Cedis</h4>
          </div>
          <p>We look forward to your stay!</p>
        </div>
      </header>
    `, 
  };
  try {
    await transporter.sendMail(mailOptions);
    const reject = await bookingModel.findByIdAndUpdate(
      { _id: bookid },
      { status: "rejected" }
    );
    console.log(reject)
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


