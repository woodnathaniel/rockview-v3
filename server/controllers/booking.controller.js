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
      }else{

        try {
      
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
            subject: "Rockview Hospitalities Booking Confirm message",
            text: "Hello world?", 
            html: `
              <header>
                <h2>Thank you for choosing Rockview Hospitalities</h2><h4>...where you experience nature from home.</h4>
                <div>
                  <p>
                    Thank you for your booking request with Rockview Hospitalities. We have received your request and are currently processing it.
                    You will receive a confirmation message <b>in less than 24hour</b> once your booking is approved at the mail your provided. If we need any additional information from you, we will contact you shortly.
                    Thank you for choosing Rockview Hospitalities. We look forward to the opportunity to serve you.
                  </p> 
      
      
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
                    <li>Total Amount: ${totalamount} Ghana cedis</li>
                  </ul>
      
                  <p>We look forward to your stay!</p>
                </div>
              </header>
            `, 
          };
          const mail = await transporter.sendMail(mailOptions);
          res.status(200).json(mail)
          console.log('Mail sent successfully');

        } catch (error) {
          console.error('Error sending mail:', error);
          return res.status(500).send('Error sending email');
        }
      }

      res.status(200).send("Booking registered successfully")

    // const roomtemp = await roomModel.findByIdAndUpdate(
    //   { _id: roomid },
    //   {
    //     $set: {
    //       currentbookings: {
    //         bookingid: booking._id,
    //         userid: userid,
    //         fromdate: booking.fromdate,
    //         todate: booking.todate,
    //         status: booking.status,
    //       },
    //     },
    //   },
    //   { new: true }
    // );
   
  
    
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

    if(cancel){
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
        to: cancel?.email, // Ensure `email` is correctly formatted if it's an array
        subject: "Rockview Hospitalities Booking Request Review message",
        text: "Hello world?", 
        html: `
          <header>
            <h2>Thank you for choosing Rockview Hospitalities</h2><h4>...where you experience nature from home.</h4>
            <div>
              <h3>Your Booking Request Review Result</h3>
              <p>
                Thank you for informing us about the cancellation of your booking request with Rockview Hospitalities. We understand that plans can change, and we appreciate you letting us know.
                If there's anything we can do to assist you in the future, please don't hesitate to reach out. We hope to have the opportunity to serve you another time.
                If this action was made unintentionally you can make the booking request again: <a href="https://rockviewhospitalities.vercel.app/booking">click Here To Make Booking Request</a>
                Thank you for considering Rockview Hospitalities.
              </p>
              <div >

               <h3>Booking Details</h3>
                <ul>
                  <li>Booking: ${cancel?._id}</li>
                  <li>Userid: ${cancel?.userid}</li>
                  <li>Room Type: ${cancel?.roomtype}</li>
                  <li>Numer of Room Booked: ${cancel?.numberRooms}</li>
                  <li>CheckIn Date: ${cancel?.fromdate}</li>
                  <li>CheckOut Date: ${cancel?.todate}</li>
                  <li>Total Days: ${cancel?.totaldays} Days</li>
                  <li>Total Amount: ${cancel?.totalamount} Ghana Cedis</li>
                </ul>
              </div>
              <p>We look forward to your stay!</p>
            </div>
          </header>
        `, 
      };

      try {
        const mail = await transporter.sendMail(mailOptions);
        res.status(200).json(mail);
      } catch (error) {
        res.status(400).json(error);
      }
    }
    
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
    if(confirm){
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
        to: confirm?.email, // Ensure `email` is correctly formatted if it's an array
        subject: "Rockview Hospitalities Booking Request Review message",
        text: "Hello world?", 
        html: `
          <header>
            <h2>Thank you for choosing Rockview Hospitalities</h2><h4>...where you experience nature from home.</h4>
            <div>
              <h3>Your Booking Request Review Result</h3>
              <p>
               Thank you for your booking request with Rockview Hospitalities. We are pleased to inform you that your request <b>has been APPROVED</b>.
                Your reservation is confirmed for <b>${confirm?.fromdate}</b> at Rockview Hospitalities. We look forward to welcoming you and providing you with a great experience.
                If you have any special requests or need further assistance, please let us know. We're here to help!
                Thank you for choosing Rockview Hospitalities.
              </p>
              <div>

               <h3>Booking Details</h3>
                <ul>
                  <li>Booking ID: ${confirm?._id}</li>
                  <li>User ID: ${confirm?.userid}</li>
                  <li>Room Type: ${confirm?.roomtype}</li>
                  <li>Numer of Room Booked: ${confirm?.numberRooms}</li>
                  <li>CheckIn Date: ${confirm?.fromdate}</li>
                  <li>CheckOut Date: ${confirm?.todate}</li>
                  <li>Total Days: ${confirm?.totaldays} Days</li>
                  <li>Total Amount: ${confirm?.totalamount} Ghana Cedis</li>
                </ul>
              </div>
              <p>We look forward to your stay!</p>
            </div>
          </header>
        `, 
      };

      try {
        const mail = await transporter.sendMail(mailOptions);
        res.status(200).json(mail);
      } catch (error) {
        res.status(400).json(error);
      }
    }


    res.status(200).json(confirm);
    console.log("successful approved api");
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
    console.log("failed approval api");
  }
};


// Rejecting booking requests API

const rejectbooking = async (req, res) => {
  const { bookid, reason, email} = req.body;


  try {
    
    const reject = await bookingModel.findByIdAndUpdate(
      { _id: bookid },
      { status: "rejected" }
    );
    if(reject){
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
            <h2>Thank you for choosing Rockview Hospitalities</h2><h4>...where you experience nature from home.</h4>
            <div>
              <h3>Your Booking Request Review Result</h3>
              <p>
                Thank you for your interest in Rockview Hopitalities Services. We appreciate you considering us for your needs.
                Unfortunately, we are unable to accommodate your booking request at this time due to <h3 style{{color: 'red', fontSize: '15px'}}> <b> ${reason} <b/></h3>. We apologize for any inconvenience this may cause.
                We hope to have the opportunity to serve you in the future. If you have any questions or would like assistance with alternative arrangements, please feel free to contact us.
                Thank you for your understanding.
              </p>
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
        const reject = await transporter.sendMail(mailOptions);
        res.status(200).json(reject);
        console.log(reject);
      } catch (error) {
        res.status(200).json(error);
      }
    }

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


