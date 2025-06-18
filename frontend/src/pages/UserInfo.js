import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/UserInfo.css';

const UserInfo = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(''); // Assume you set this somehow

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`/api/userInfo/${userId}`);
        const user = response.data;
        setUsername(user.username);
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber);
        setHobbies(user.hobbies);
        setSocialMedia(user.socialMedia);
        setProfilePic(user.profilePic ? `/uploads/${user.profilePic}` : 'default-profile-pic.png');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('hobbies', hobbies);
    formData.append('socialMedia', socialMedia);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    try {
      await axios.patch(`/api/userInfo/update/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('User profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => setIsEditing(false);

  return (
    <div className="user-info">
      <ToastContainer />
      <div className="profile-header">
        <h1 className="username">{username || 'New User'}</h1>
        <div className="profile-pic-container">
          <div className="profile-pic-wrapper">
            <img src={profilePic || 'default-profile-pic.png'} alt="Profile" className="profile-pic" />
          </div>
          <input type="file" id="profile-pic-input" onChange={handleProfilePicChange} style={{ display: 'none' }} />
          <label htmlFor="profile-pic-input" className="camera-icon">📷</label>
        </div>
      </div>
      <div className="profile-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label>Hobbies:</label>
          <textarea
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label>Social Media Links:</label>
          <textarea
            value={socialMedia}
            onChange={(e) => setSocialMedia(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="form-actions">
          {isEditing ? (
            <>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
