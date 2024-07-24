const express = require('express')
// const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express()
const mongoose = require('mongoose');
const  router  = require('./routes/getdata.route')
const userRouter = require('./routes/users.route')
const bookingrouter = require('./routes/booking.route')
require("dotenv").config();
const passport = require('passport')
const cors = require('cors')
const cookieSession = require('cookie-session');
const authRouter = require('./routes/auth.route')
const ContactRouter = require('./routes/contact.route.js')
const galleryrouter = require('./routes/gallery.route.js')


// Proxy middleware configuration
// app.use('/', createProxyMiddleware({ 
//   target: 'http://localhost:6000', 
//   changeOrigin: true 
// }));

// app.use(
//   cors({
//     origin: ["https://rockviewhospitalities.vercel.app"],
//     methods: "GET, POST, PUT, DELETE",
//     credentials: true
//   })
// )

const allowedOrigins = ['http://localhost:3000', 'https://rockviewhospitalities.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));


const port = 5000
const mongoUrl = 'mongodb+srv://rockviewHotel:rockviewHotelDB@rockviewcluster.vid064j.mongodb.net/rockviewDB'
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type'],
// };

require('./auth.js')

app.use(express.json())
// app.use(cors(corsOptions));

// require('./auth')(passport)
// Set up session cookies
// app.use(session({
//   secret: 'cats',
//   resave: false,
//   saveUninitialized: false,
//   // cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
// }));

app.use(
  cookieSession({
    name:"session",
    keys:["rockview"],
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    maxAge: 24*60*60*100
  })
)

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());





app.use('/api/rooms', router)
app.use('/api/users', userRouter)
app.use('/api/bookings', bookingrouter) 
app.use("/auth", authRouter)
app.use("/api/user", ContactRouter)
app.use('/api/gallery', galleryrouter) 
// app.use('/api', bookingrouter)

app.get('/', (req, res) => res.send('hello there'));



//passport setup api
// app.get('/api/auth/google', 
//   passport.authenticate('google', {scope: ['email' , 'profile']})
// )
  

  
//connect to db
  mongoose.connect(mongoUrl)
  .then(()=>{
    console.log('mongodb connected successfully');
    app.listen(port, () => console.log(`Server listening on port ${port}!`))
  })
  .catch((err)=>{
    console.log(err)
  });

