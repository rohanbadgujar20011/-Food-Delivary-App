import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          🍕 FoodDelivery
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-link" onClick={closeMenu}>
            Home
          </Link>
          
          <Link to="/restaurants" className="navbar-link" onClick={closeMenu}>
            Restaurants
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="navbar-link" onClick={closeMenu}>
                Profile
              </Link>
              
              <Link to="/cart" className="navbar-link" onClick={closeMenu}>
                Cart
              </Link>
              
              <Link to="/orders" className="navbar-link" onClick={closeMenu}>
                Orders
              </Link>
              
              <Link to="/notifications" className="navbar-link" onClick={closeMenu}>
                Notifications
              </Link>
              
              <button 
                onClick={handleLogout}
                className="navbar-link logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link" onClick={closeMenu}>
                Login
              </Link>
              
              <Link to="/signup" className="navbar-link" onClick={closeMenu}>
                Sign Up
              </Link>
            </>
          )}
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
