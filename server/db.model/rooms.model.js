const mongoose = require('mongoose');

const roomSchema = mongoose.Schema(
  {
    roomtype: {
      type: String,
      required: [true, 'please enter room type']
    },

    roomname: {
      type: String,
      required: [true, 'please enter room name']
    },

    facilities:{
      type: [],
      required: [true, 'Please enter the facilities in the room']
    },

    maxcount: {
      type: Number,
      required: true
    },

    rentperday:{
      type: Number,
      required: [true, 'please enter the rent per day']
    },

    imageurls:{
      type: [],
      required: false
    },

    available:{
      type: Boolean,
      default: true,
      required:[true, 'please enter if it is availble for booking']
      
    },
    currentbookings:{
      type: Array
      
    }, 
    approvedbookings:{
      type: Array
      
    }, 
    description:{
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const roomModel = mongoose.model('rockviewcollections', roomSchema);

module.exports = roomModel;

