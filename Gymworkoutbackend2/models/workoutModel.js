const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    intensity: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    notes: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Workout', workoutSchema);
