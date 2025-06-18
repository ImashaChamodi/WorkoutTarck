// UserinfoModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  hobbies: {
    type: String,
  },
  socialMedia: {
    type: String,
  },
  profilePic: {
    type: String, // Stores the filename of the uploaded profile picture
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
