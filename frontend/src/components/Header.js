import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserInfo = () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUserName(decodedToken.username); // Extract username from token
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
    <header className="header">
      <div className="logo">GymApp</div>
      {/* <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div> */}
      <div className="header-icons">
        <div className="notifications">🔔</div>
        <div className="user-profile">
          <NavLink to="/user-info">
            <span>{userName || 'User'}</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
