
const  mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
  { 
    roomid:{
     type: String,
      required: true
    },

    roomtype :{
      type: String,
      required: true
    },

    userid:{
      type: String,
      required: true
    },

    contact:{
      type: Number,
      required: true
    },

      // country:{
    //   type: String,
    //   required: true
    // },

    // numberRooms:{
    //   type: Number,
    //   required: true
    // },

    email:{
      type: String,
      required: true
    },

    guest:{
      type: Number,
      required: true
    },

    children:{
      type: Number,
      required: true,
      default: 0
    },

    occassion:{
      type: String,
      required: false
    },

    fromdate: {
      type: String,
      required: true
    },
    
    todate: {
      type: String,
      required: true
    },

    totaldays:{
      type: Number,
      required: true
    },

    totalamount: {
     type: Number,
      required: true
    } ,
    
    status:{
      type: String,
      required: true,
      default: 'pending',
    },
  },
 { timestamps: true,}

)

const bookingModel = mongoose.model('bookings', bookingSchema)
module.exports = bookingModel