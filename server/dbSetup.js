const mongoose = require('mongoose');

const mongoUrl = 'mongodb+srv://rockviewHotel:rockviewHotelDB@rockviewcluster.vid064j.mongodb.net/rockviewDB'

const mongoosConnection = async () =>{
//connect to db
  mongoose.connect(mongoUrl)
  .then(()=>{
    console.log('mongodb connected successfully');
  })
  .catch((err)=>{
  console.log(err)
  });

}
module.exports = mongoosConnection()
