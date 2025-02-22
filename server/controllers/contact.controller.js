const nodemailer = require("nodemailer");


const contact = async (req, res) => {
  
  const {name, email, message} = req.body

  if(name && email){
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

      const transporterYahooMail = nodemailer.createTransport({
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
          name: name, 
          address: email
        },
        to: 'nathanielwood002@gmail.com', // Ensure `email` is correctly formatted if it's an array
        subject: "Rockview Hospitalities Client Contact Mail",
        text: "Hello world?", 
        html: `
          <header>
            <h2>Email From ${name}</h4>
            <div>
              <p>
                ${message}
              </p> 
            </div>
          </header>
        `, 
      };
      // if(email.include('gmail')){
      //   const mail = await transporter.sendMail(mailOptions);
      // }else if(email.include('yahoo')){
      //   const mail = await transporterYahooMail
      // }
      const mail = await transporter.sendMail(mailOptions);
      res.status(200).json(mail)
      console.log('Mail sent successfully');

    } catch (error) {
      console.error('Error sending mail:', error);
      return res.status(500).send('Error sending email');
    }
  }else{
    res.status(500).json({message: 'email or name required'})
  }
       
}

module.exports = {contact}


  
    
