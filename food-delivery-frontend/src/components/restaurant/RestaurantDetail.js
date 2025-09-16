import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api';
import './Restaurant.css';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetchRestaurantDetails();
    fetchMenuItems();
  }, [id]);

  const fetchRestaurantDetails = async () => {
    try {
      const response = await api.get(`/restaurants/${id}`);
      setRestaurant(response.data);
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await api.get(`/restaurants/${id}/menu`);
      setMenuItems(response.data);
    } catch (error) {
      setError('Failed to fetch menu items');
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (menuItem) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setCart(prevCart => ({
      ...prevCart,
      [menuItem.id]: {
        ...menuItem,
        quantity: (prevCart[menuItem.id]?.quantity || 0) + 1
      }
    }));
  };

  const removeFromCart = (menuItemId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (newCart[menuItemId]) {
        newCart[menuItemId].quantity -= 1;
        if (newCart[menuItemId].quantity <= 0) {
          delete newCart[menuItemId];
        }
      }
      return newCart;
    });
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return Object.values(cart).reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const proceedToCart = () => {
    if (Object.keys(cart).length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    // Store cart data in localStorage for Cart component
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('restaurantId', id);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="restaurant-detail-container">
        <div className="loading">Loading restaurant details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="restaurant-detail-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="restaurant-detail-container">
      {restaurant && (
        <div className="restaurant-header">
          <h2>{restaurant.name}</h2>
          <p className="restaurant-location">📍 {restaurant.location}</p>
          {restaurant.description && (
            <p className="restaurant-description">{restaurant.description}</p>
          )}
        </div>
      )}

      <div className="menu-section">
        <h3>Menu</h3>
        
        {menuItems.length === 0 ? (
          <div className="no-menu-items">
            <p>No menu items available at the moment.</p>
          </div>
        ) : (
          <div className="menu-grid">
            {menuItems.map((item) => (
              <div key={item.id} className="menu-item-card">
                <div className="menu-item-image">
                  <img
                    src={item.image || '/api/placeholder/200/150'}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x150?text=Food';
                    }}
                  />
                </div>
                
                <div className="menu-item-info">
                  <h4>{item.name}</h4>
                  <p className="menu-item-description">{item.description}</p>
                  <div className="menu-item-price">${item.price.toFixed(2)}</div>
                  
                  <div className="menu-item-actions">
                    {cart[item.id] ? (
                      <div className="quantity-controls">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="quantity-btn"
                        >
                          -
                        </button>
                        <span className="quantity">{cart[item.id].quantity}</span>
                        <button 
                          onClick={() => addToCart(item)}
                          className="quantity-btn"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => addToCart(item)}
                        className="add-to-cart-btn"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {getCartItemCount() > 0 && (
        <div className="cart-summary">
          <div className="cart-info">
            <span>{getCartItemCount()} items in cart</span>
            <span className="cart-total">Total: ${getCartTotal().toFixed(2)}</span>
          </div>
          <button onClick={proceedToCart} className="proceed-to-cart-btn">
            Proceed to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetail;
