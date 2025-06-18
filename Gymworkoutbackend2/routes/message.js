const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel'); // Import the message model

// POST /messages - Create a new message

router.post('/', async (req, res) => {
  try {
    const { text, username } = req.body;
    const newMessage = new Message({ text, username });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create message' });
  }
});

// GET /messages - Retrieve all messages 
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

module.exports = router;
