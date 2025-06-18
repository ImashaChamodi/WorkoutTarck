import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import AddWorkout from './pages/AddWorkout.js';
import ViewProgress from './pages/ViewProgress.js';
// import UserProfile from './pages/UserProfile.js';
import NutritionTracking from './pages/NutritionTracking.js';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CommonChat from './pages/CommonChat.js';
import UserInfo from'./pages/UserInfo.js'
import './styles/global.css';


function App() {
  const location = useLocation();

  // Determine if the current route is one of the auth or home pages
  const isAuthPage = ['/login', '/register', '/'].includes(location.pathname);

  return (
    <div className="app-container">
      {/* Conditionally render Header and Sidebar */}
      {!isAuthPage && <Header />}
      <div className="main-layout">
        {!isAuthPage && <Sidebar />}
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/add-workout" element={<AddWorkout />} />
            <Route path="/view-progress" element={<ViewProgress />} />
            <Route path="/common-chat" element={<CommonChat />} />
            <Route path="/nutrition-tracking" element={<NutritionTracking />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-info" element={<UserInfo />} />
            
          </Routes>
        </div>
      </div>
    </div>
  );
}

function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default WrappedApp;
