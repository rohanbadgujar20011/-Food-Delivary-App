import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Delicious Food Delivered to Your Door</h1>
          <p>Order from your favorite restaurants and enjoy fresh, hot meals delivered right to your doorstep.</p>
          
          <div className="hero-actions">
            {user ? (
              <Link to="/restaurants" className="cta-button">
                Order Now
              </Link>
            ) : (
              <>
                <Link to="/signup" className="cta-button primary">
                  Get Started
                </Link>
                <Link to="/login" className="cta-button secondary">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
        
        <div className="hero-image">
          <div className="food-illustration">
            🍕🍔🍜🍰
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Get your food delivered in 30-45 minutes with our efficient delivery network.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🍽️</div>
            <h3>Fresh Food</h3>
            <p>Partner with top-rated restaurants to ensure you get the freshest and tastiest meals.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Easy Payment</h3>
            <p>Multiple payment options including cards, UPI, net banking, and cash on delivery.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Live Tracking</h3>
            <p>Track your order in real-time from preparation to delivery at your doorstep.</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">1000+</div>
            <div className="stat-label">Happy Customers</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Partner Restaurants</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Orders Delivered</div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number">4.8★</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>
      </div>

      {!user && (
        <div className="cta-section">
          <h2>Ready to Order?</h2>
          <p>Join thousands of satisfied customers and start ordering your favorite food today!</p>
          <div className="cta-actions">
            <Link to="/signup" className="cta-button primary large">
              Create Account
            </Link>
            <Link to="/restaurants" className="cta-button secondary large">
              Browse Restaurants
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
