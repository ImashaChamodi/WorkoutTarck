const express = require('express');
const Workout = require('../models/workoutModel');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();


router.post('/', authenticate, async (req, res) => {
    const { name, type, duration, intensity, date, description, notes } = req.body;
    const userId = req.userId;

    console.log('Add workout request received:', { name, type, duration, intensity, date, description, notes, userId });

    try {
        const newWorkout = new Workout({
            name, type, duration, intensity, date, description, notes, userId
        });
        await newWorkout.save();

        console.log('Workout added successfully:', newWorkout);

        res.status(201).json({ message: 'Workout added successfully', workout: newWorkout });
    } catch (error) {
        console.error('Error adding workout:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
