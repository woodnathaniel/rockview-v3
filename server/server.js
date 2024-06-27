const express = require('express')
const app = express()
const mongoose = require('mongoose');
const  router  = require('./routes/getdata.route')
const userRouter = require('./routes/users.route')
const bookingrouter = require('./routes/booking.route')


const port = 6000
const mongoUrl = 'mongodb+srv://rockviewHotel:rockviewHotelDB@rockviewcluster.vid064j.mongodb.net/rockviewDB'
app.use(express.json())

app.use('/api/rooms', router)
app.use('/api/users', userRouter)
app.use('/api/bookings', bookingrouter) 
// app.use('/api', bookingrouter)

app.get('/', (req, res) => res.send('hello there'));

//connect to db
  mongoose.connect(mongoUrl)
  .then(()=>{
    console.log('mongodb connected successfully');
    app.listen(port, () => console.log(`Server listening on port ${port}!`))
  })
  .catch((err)=>{
    console.log(err)
  });

