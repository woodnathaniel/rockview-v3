const usersModelDb = require('../db.model/users.model');
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


const userData = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if required fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    const newUsers = new usersModelDb({
      name: name,
      email: email,
      password: password
    });

   const register = await newUsers.save();
  res.status(200).json(register);
  console.log('User registered successfully');

    } catch (error) {
      res.status(500).json({ error: 'Failed to register user', details: error.message });
      console.error('Failed to register user:', error);
  }
};

const loginData = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userLogin = await usersModelDb.findOne({ email: email, password: password });

    if (userLogin) {
      res.status(200).send(userLogin);
      console.log(`login api: ${userLogin}`);
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to log in', details: error.message });
    // console.error('Failed to log in:', error);
    console.log(`login api err: ${error}`);
  }
};

const resetPasswordCheck = async (req, res) =>{
  const {email, password} = req.body;
  try {
    const userEmail = await usersModelDb.findOne({ email: email});
    console.log(userEmail);
    
    if(userEmail){
      res.status(200).send(userEmail)
      const mailOptions = {
        from: {
          name: "Rockview Hospitality 👻",
          address: NODEMAILER_USER
        },
        to: userEmail.email,
        subject: "Rockview Hospitality Booking Confirmation",
        text: "PassWord Reset",
        html: `
          <header>
            <h2>Click to change your password. <a>http://rockviewhotel.vercel.app/rockview/user/resetpassword</a></h2>
            <h4>Please if you Didn't request for this action, ignore this message</h4>
          </header>
        `,
      };

      await transporter.sendMail(mailOptions);
    }else{
      res.status(401).send(`email don't exist`)
    }
  } catch (error) {
    res.status(500).json({error: 'failed', details: error.message })
    console.log(`login api err: ${error}`);
  }
}

const resetPassword = async (req, res) =>{
  const {email, password} = req.body;
  try {
    const userEmail = await usersModelDb.findOne({ email: email});
    if(userEmail){
      try {
        const filter = { email: email };
        const updateDoc = {
          $set: { password: password } 
        };
        const updatePassword = await usersModelDb.updateOne(filter, updateDoc);
        res.status(200).send(updatePassword)

      } catch (error) {
        res.status(500).json({error: 'failed', details: error.message })
      }

    }else{
      res.status(401).send(`email don't exist`)
    }



  } catch (error) {
    res.status(500).json({error: 'failed', details: error.message })
    console.log(`login api err: ${error}`);
  }
}

const getAllUsers = async(req, res)=>{

  try {
    const users = await usersModelDb.find()
    res.status(200).json(users)
    console.log('users get success api');
  } catch (error) {
    console.log(error);
    console.log('user get failed api');
  }
}

module.exports = { userData, loginData, getAllUsers, resetPassword, resetPasswordCheck};