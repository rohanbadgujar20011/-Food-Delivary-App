import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import './Restaurant.css';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await api.get('/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      setError('Failed to fetch restaurants');
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurants/${restaurantId}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="restaurant-list-container">
        <div className="loading">Loading restaurants...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="restaurant-list-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="restaurant-list-container">
      <h2>Restaurants</h2>
      
      {restaurants.length === 0 ? (
        <div className="no-restaurants">
          <p>No restaurants available at the moment.</p>
        </div>
      ) : (
        <div className="restaurant-grid">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="restaurant-card"
              onClick={() => handleRestaurantClick(restaurant.id)}
            >
              <div className="restaurant-image">
                <img
                  src={restaurant.image || '/api/placeholder/300/200'}
                  alt={restaurant.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Restaurant';
                  }}
                />
              </div>
              
              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <p className="restaurant-location">
                  📍 {restaurant.location || 'Location not specified'}
                </p>
                
                <div className="restaurant-rating">
                  <div className="stars">
                    {renderStars(restaurant.rating || 0)}
                  </div>
                  <span className="rating-text">
                    {restaurant.rating ? restaurant.rating.toFixed(1) : 'No rating'}
                  </span>
                </div>
                
                {restaurant.description && (
                  <p className="restaurant-description">
                    {restaurant.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
