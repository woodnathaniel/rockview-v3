const mongoose = require('mongoose')
const { Timestamp } = require('mongodb')

const userSchema = mongoose.Schema(
  {
    googleid: {
      type: String,
      required: false
    },

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    isAdmin: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const usersModelDb = mongoose.model('users', userSchema);

module.exports = usersModelDb;
