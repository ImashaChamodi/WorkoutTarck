import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/add-workout" activeClassName="active">Add Workout</NavLink>
          </li>
          <li>
            <NavLink to="/view-progress" activeClassName="active">View Progress</NavLink>
          </li>
          <li>
            <NavLink to="/common-chat" activeClassName="active">Chat with Community</NavLink>
          </li>
          <li>
            <NavLink to="/nutrition-tracking" activeClassName="active">Nutrition Tracking</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
