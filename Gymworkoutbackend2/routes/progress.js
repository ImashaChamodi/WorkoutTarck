const express = require('express');
const Workout = require('../models/workoutModel');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
    const userId = req.userId; // Get user ID from the token

    try {
        // Fetch workouts specific to the logged-in user
        const workouts = await Workout.find({ userId });

        if (!workouts || workouts.length === 0) {
            return res.status(404).json({ message: 'No workout data found' });
        }

        // Calculate progress metrics for the pie chart, bar chart, etc.
        const pieData = workouts.reduce((acc, workout) => {
            acc[workout.type] = (acc[workout.type] || 0) + workout.duration;
            return acc;
        }, {});

        const barData = workouts.map(workout => ({
            name: workout.name,
            duration: workout.duration,
            intensity: workout.intensity
        }));

        const summary = {
            totalWorkouts: workouts.length,
            totalTime: workouts.reduce((acc, workout) => acc + workout.duration, 0),
            averageIntensity: (workouts.reduce((acc, workout) => acc + workout.intensity, 0) / workouts.length).toFixed(2)
        };

        res.status(200).json({ pieData, barData, summary });
    } catch (error) {
        console.error('Error fetching workout data:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


module.exports = router;
