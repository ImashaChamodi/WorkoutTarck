const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();

// Secret key for signing the JWT (should be stored in an environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'J9kRjF4&c5D$@7!m1WbZ';

// POST /register - Register a new user
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    console.log('Register request received:', { username, password });

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('Username already exists:', username);
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '1h' });

        console.log('User registered successfully:', { userId: newUser._id, token });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;

