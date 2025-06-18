import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';


function HomePage() {
  return (
    <div className="homepage">
      <div className="homepage-content">
        <h1 className="homepage-title">Welcome to the Gym Workout Record System</h1>
        <p className="homepage-subtitle">Track your workouts and progress easily.</p>
        <div className="homepage-nav">
          <Link to="/login" className="nav-button">Login</Link>
          <Link to="/register" className="nav-button">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
