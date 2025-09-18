import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  const handleViewProfile = () => {
    navigate('/profile');
    setShowDropdown(false);
  };

  const handleViewCart = () => {
    navigate('/cart');
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const getWelcomeMessage = () => {
    const role = user?.role;
    switch (role) {
      case 'USER':
        return 'Welcome! Browse restaurants and order your favorite food.';
      case 'RESTAURANT_OWNER':
        return 'Welcome! Manage your restaurant and view orders.';
      case 'DELIVERY_PARTNER':
        return 'Welcome! View your delivery assignments.';
      default:
        return 'Welcome to Food Delivery System!';
    }
  };

  const getDashboardActions = () => {
    const role = user?.role;
    switch (role) {
      case 'USER':
        return (
          <div className="dashboard-actions">
            <button 
              onClick={() => navigate('/restaurants')}
              className="action-button primary"
            >
              Browse Restaurants
            </button>
            <button 
              onClick={() => navigate('/orders')}
              className="action-button secondary"
            >
              View Orders
            </button>
          </div>
        );
      case 'RESTAURANT_OWNER':
        return (
          <div className="dashboard-actions">
            <button 
              onClick={() => navigate('/restaurants')}
              className="action-button primary"
            >
              Manage Restaurant
            </button>
            <button 
              onClick={() => navigate('/orders')}
              className="action-button secondary"
            >
              View Orders
            </button>
          </div>
        );
      case 'DELIVERY_PARTNER':
        return (
          <div className="dashboard-actions">
            <button 
              onClick={() => navigate('/orders')}
              className="action-button primary"
            >
              View Deliveries
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="action-button secondary"
            >
              Update Profile
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <p className="welcome-message">{getWelcomeMessage()}</p>
        </div>
        
        <div className="user-menu">
          <div className="user-info" onClick={toggleDropdown}>
            <div className="user-avatar">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="user-details">
              <span className="user-name">{user?.email || 'User'}</span>
              <span className="user-role">{user?.role?.replace('_', ' ')}</span>
            </div>
            <div className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>
              ▼
            </div>
          </div>
          
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={handleViewProfile}>
                <span className="dropdown-icon">👤</span>
                View Profile
              </div>
              <div className="dropdown-item" onClick={handleViewCart}>
                <span className="dropdown-icon">🛒</span>
                Cart (Orders)
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item logout" onClick={handleLogout}>
                <span className="dropdown-icon">🚪</span>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">🍕</div>
            <div className="stat-info">
              <h3>Restaurants</h3>
              <p>Browse available restaurants</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <h3>Orders</h3>
              <p>Track your orders</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🚚</div>
            <div className="stat-info">
              <h3>Delivery</h3>
              <p>Track deliveries</p>
            </div>
          </div>
        </div>

        {getDashboardActions()}
      </div>
    </div>
  );
};

export default UserDashboard;
