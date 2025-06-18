const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer for file uploads
const upload = multer({
  dest: 'uploads/', // Directory to save uploaded files
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image file (jpg, jpeg, or png).'));
    }
    cb(undefined, true);
  },
});

// Create user profile
router.post('/create', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update user profile
router.patch('/update/:id', upload.single('profilePic'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;
    if (req.body.phoneNumber) user.phoneNumber = req.body.phoneNumber;
    if (req.body.hobbies) user.hobbies = req.body.hobbies;
    if (req.body.socialMedia) user.socialMedia = req.body.socialMedia;

    if (req.file) {
      // Remove old profile pic if exists
      if (user.profilePic) {
        fs.unlinkSync(path.join(__dirname, '../uploads/', user.profilePic));
      }
      user.profilePic = req.file.filename;
    }

    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

