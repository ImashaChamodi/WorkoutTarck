import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import '../styles/Dashboard.css';

function Dashboard() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserInfo = () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUsername(decodedToken.username); // Extract username from token
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      } else {
        console.error('No token found');
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome back, {username}!</h1>
      <p>"Push yourself, because no one else is going to do it for you."</p>
      <div className="quick-stats">
        <div className="stat">Total Workouts: 1</div>
        <div className="stat">Calories Burned: 0 </div>
        <div className="stat">Duration: 0 min</div>
      </div>
      {/* <div className="progress-charts">
        {/* Add your chart components here */}
      {/* </div> */} 
      {/* <div className="upcoming-workouts"> */}
        {/* Add your upcoming workout components here */}
      {/* </div> */}
    </div>
  );
}

export default Dashboard;
