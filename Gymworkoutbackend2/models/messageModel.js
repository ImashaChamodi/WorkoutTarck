const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    default: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
