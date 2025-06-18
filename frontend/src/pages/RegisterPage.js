import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setError('');
        navigate('/login'); // Redirect to login on successful registration
      } else {
        setError(data.message || 'Registration failed');
        setSuccess('');
      }
    } catch (error) {
      setError('Registration error');
      setSuccess('');
      console.error('Registration error', error);
    }
  };

  return (
    <div className="auth-page">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <p>Already have an account?</p>
      <button onClick={() => navigate('/login')} className="navigate-button">
        Go to Login
      </button>
    </div>
  );
}

export default RegisterPage;
