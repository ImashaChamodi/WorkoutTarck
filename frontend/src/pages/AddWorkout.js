import React, { useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import '../styles/AddWorkout.css';
import workoutImage from '../Assets/Images/Workout2.jpg';

const socket = io('http://localhost:5000');

function AddWorkout() {
    const [workout, setWorkout] = useState({
        name: '',
        type: '',
        duration: '',
        intensity: '',
        date: '',
        description: '',
        notes: ''
    });

    // Retrieve userId and token from localStorage
    const userId = localStorage.getItem('userId');
    
    const token = localStorage.getItem('token');

    console.log('Fetched userId from localStorage:', userId);
    console.log('Fetched token from localStorage:', token);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkout({
            ...workout,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting workout:', workout);

        try {
            const response = await axios.post(
                'http://localhost:5000/api/workouts',
                { ...workout, userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log('Workout Added:', response.data);

            // Emit the new workout to the server for real-time updates
            socket.emit('newWorkout', { ...workout, userId });

            // Clear form fields
            setWorkout({
                name: '',
                type: '',
                duration: '',
                intensity: '',
                date: '',
                description: '',
                notes: ''
            });
        } catch (error) {
            console.error('Error adding workout:', error.response ? error.response.data : error.message);
            alert('Failed to add workout. Please check the console for details.');
        }
    };

    const handleClear = () => {
        setWorkout({
            name: '',
            type: '',
            duration: '',
            intensity: '',
            date: '',
            description: '',
            notes: ''
        });
    };

    return (
        <div className="add-workout-page">
            <div className="image-container">
                <img src={workoutImage} alt="Workout" />
                <div className="image-caption">
                    <h2>Workout of the Day</h2>
                    <p>"Elevate Your Fitness Journey with Precision and Passion" Discover the ultimate way to log and track your workouts with our user-friendly interface. Whether you're aiming for high-intensity training or a relaxing yoga session, our platform helps you document every detail with ease. From setting workout goals to monitoring your progress, we've got you covered. Join us and transform your fitness routine into a structured and rewarding experience."</p>
                </div>
            </div>
            <div className="form-container">
                <h1>Workout Details</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Workout Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={workout.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Workout Type:</label>
                        <select
                            id="type"
                            name="type"
                            value={workout.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="cardio">Cardio</option>
                            <option value="strength">Strength</option>
                            <option value="yoga">Yoga</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="duration">Duration (minutes):</label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            value={workout.duration}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="intensity">Intensity:</label>
                        <select
                            id="intensity"
                            name="intensity"
                            value={workout.intensity}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Intensity</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={workout.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={workout.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="notes">Notes:</label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={workout.notes}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit">Add Workout</button>
                    <button type="button" onClick={handleClear}>Clear</button>
                </form>
            </div>
        </div>
    );
}

export default AddWorkout;
