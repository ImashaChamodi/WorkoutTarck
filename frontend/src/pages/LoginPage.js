import React, { useState } from 'react';
import axios from 'axios';
import '../styles/global.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                username,
                password
            });

            const { token, userId } = response.data;

            // Store token and userId in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);

            // Redirect to the dashboard or another page
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="auth-page">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Username"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account?</p>
            <button onClick={() => window.location.href = '/register'} className="navigate-button">
                Go to Register
            </button>
        </div>
    );
}

export default Login;


