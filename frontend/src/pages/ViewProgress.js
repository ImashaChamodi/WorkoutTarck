import React, { useEffect, useState, useCallback } from 'react';
import _ from 'lodash';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import socketIOClient from 'socket.io-client';
import '../styles/ViewProgress.css';

const ViewProgress = () => {
    const [workoutData, setWorkoutData] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = socketIOClient('http://localhost:5000');
        setSocket(newSocket);

        fetchData();

        newSocket.on('workoutDataUpdated', () => {
            fetchData();
        });

        return () => newSocket.close();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/progress', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setWorkoutData(data);
            } else {
                setWorkoutData(null);
                console.error('No workout data found');
            }
        } catch (error) {
            console.error('Error fetching workout data:', error);
        }
    };

    const debouncedFetchData = useCallback(_.debounce(fetchData, 300), []);

    if (!workoutData) {
        return <div className="no-data">No workout data available. Please add some workout details.</div>;
    }

    const { pieData, barData, summary } = workoutData;
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="progress-container">
            <div className="content">
                <h3>Workout Type Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie dataKey="value" data={Object.entries(pieData).map(([name, value]) => ({ name, value }))}>
                            {Object.entries(pieData).map(([name, value], index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>

                <h3>Workout Durations</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="duration" fill="#8884d8" />
                        <Bar dataKey="intensity" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>

                <h3>Summary</h3>
                <p>Total Workouts: {summary.totalWorkouts}</p>
                <p>Total Time: {summary.totalTime} minutes</p>
                <p>Average Intensity: {summary.averageIntensity}</p>
            </div>
        </div>
    );
};

export default ViewProgress;
