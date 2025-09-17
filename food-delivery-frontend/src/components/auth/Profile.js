import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: ''
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await api.get('/auth/me');
      setUserDetails(response.data);
      // Initialize edit form with current user data
      setEditForm({
        username: response.data.username || '',
        phoneNumber: response.data.phoneNumber || '',
        address: response.data.address || '',
        city: response.data.city || '',
        state: response.data.state || '',
        zipCode: response.data.zipCode || '',
        dateOfBirth: response.data.dateOfBirth || ''
      });
    } catch (error) {
      setError('Failed to fetch user details');
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateError('');
    setUpdateSuccess('');

    try {
      const response = await api.put('/auth/profile', editForm);
      setUserDetails(response.data);
      setIsEditing(false);
      setUpdateSuccess('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setUpdateSuccess(''), 3000);
    } catch (error) {
      setUpdateError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdateError('');
    setUpdateSuccess('');
    // Reset form to original values
    setEditForm({
      username: userDetails?.username || '',
      phoneNumber: userDetails?.phoneNumber || '',
      address: userDetails?.address || '',
      city: userDetails?.city || '',
      state: userDetails?.state || '',
      zipCode: userDetails?.zipCode || '',
      dateOfBirth: userDetails?.dateOfBirth || ''
    });
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
        
        {updateSuccess && <div className="success-message">{updateSuccess}</div>}
        {updateError && <div className="error-message">{updateError}</div>}
        
        {!isEditing ? (
          <>
            <div className="profile-info">
              <div className="info-item">
                <label>Username:</label>
                <span>{displayUser?.username || 'Not set'}</span>
              </div>
              
              <div className="info-item">
                <label>Email:</label>
                <span>{displayUser?.email || 'N/A'}</span>
              </div>
              
              <div className="info-item">
                <label>Phone Number:</label>
                <span>{displayUser?.phoneNumber || 'Not set'}</span>
              </div>
              
              <div className="info-item">
                <label>Address:</label>
                <span>{displayUser?.address || 'Not set'}</span>
              </div>
              
              <div className="info-item">
                <label>City:</label>
                <span>{displayUser?.city || 'Not set'}</span>
              </div>
              
              <div className="info-item">
                <label>State:</label>
                <span>{displayUser?.state || 'Not set'}</span>
              </div>
              
              <div className="info-item">
                <label>Zip Code:</label>
                <span>{displayUser?.zipCode || 'Not set'}</span>
              </div>
              
              <div className="info-item">
                <label>Date of Birth:</label>
                <span>{displayUser?.dateOfBirth || 'Not set'}</span>
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
              <button onClick={() => setIsEditing(true)} className="edit-button">
                Edit Profile
              </button>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleEditSubmit} className="profile-edit-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={editForm.username}
                onChange={handleEditChange}
                placeholder="Enter your username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={editForm.phoneNumber}
                onChange={handleEditChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={editForm.address}
                onChange={handleEditChange}
                placeholder="Enter your address"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={editForm.city}
                  onChange={handleEditChange}
                  placeholder="Enter your city"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={editForm.state}
                  onChange={handleEditChange}
                  placeholder="Enter your state"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={editForm.zipCode}
                  onChange={handleEditChange}
                  placeholder="Enter your zip code"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={editForm.dateOfBirth}
                  onChange={handleEditChange}
                />
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                disabled={updateLoading}
                className="save-button"
              >
                {updateLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                type="button" 
                onClick={handleCancelEdit}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
