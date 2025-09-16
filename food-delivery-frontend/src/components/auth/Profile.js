import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await api.get('/auth/me');
      setUserDetails(response.data);
    } catch (error) {
      setError('Failed to fetch user details');
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  const displayUser = userDetails || user;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Profile</h2>
        
        <div className="profile-info">
          <div className="info-item">
            <label>Username:</label>
            <span>{displayUser?.username || 'N/A'}</span>
          </div>
          
          <div className="info-item">
            <label>Email:</label>
            <span>{displayUser?.email || 'N/A'}</span>
          </div>
          
          <div className="info-item">
            <label>Role:</label>
            <span className={`role-badge role-${displayUser?.role?.toLowerCase()}`}>
              {displayUser?.role || 'N/A'}
            </span>
          </div>
          
          <div className="info-item">
            <label>User ID:</label>
            <span>{displayUser?.id || 'N/A'}</span>
          </div>
        </div>

        <div className="profile-actions">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
