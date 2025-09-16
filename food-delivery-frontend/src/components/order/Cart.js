import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api';
import './Order.css';

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [cart, setCart] = useState({});
  const [restaurantId, setRestaurantId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    const savedRestaurantId = localStorage.getItem('restaurantId');
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedRestaurantId) {
      setRestaurantId(savedRestaurantId);
    }
  }, [user, navigate]);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    setCart(prevCart => ({
      ...prevCart,
      [itemId]: {
        ...prevCart[itemId],
        quantity: newQuantity
      }
    }));
  };

  const removeItem = (itemId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      delete newCart[itemId];
      return newCart;
    });
  };

  const getTotalPrice = () => {
    return Object.values(cart).reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
  };

  const placeOrder = async () => {
    if (Object.keys(cart).length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderData = {
        userId: user.id,
        restaurantId: restaurantId,
        items: Object.values(cart).map(item => ({
          menuItemId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      const response = await api.post('/orders', orderData);
      
      // Clear cart
      setCart({});
      localStorage.removeItem('cart');
      localStorage.removeItem('restaurantId');
      
      // Redirect to payment page
      navigate('/payment', { 
        state: { 
          orderId: response.data.id, 
          amount: getTotalPrice() 
        } 
      });
      
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to place order');
      console.error('Error placing order:', error);
    } finally {
      setLoading(false);
    }
  };

  const cartItems = Object.values(cart);

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/restaurants')} className="browse-restaurants-btn">
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              <img
                src={item.image || 'https://via.placeholder.com/100x100?text=Food'}
                alt={item.name}
              />
            </div>
            
            <div className="cart-item-details">
              <h4>{item.name}</h4>
              <p className="cart-item-description">{item.description}</p>
              <div className="cart-item-price">${item.price.toFixed(2)}</div>
            </div>
            
            <div className="cart-item-controls">
              <div className="quantity-controls">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="quantity-btn"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={() => removeItem(item.id)}
                className="remove-item-btn"
              >
                Remove
              </button>
            </div>
            
            <div className="cart-item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Items ({getTotalItems()}):</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Delivery Fee:</span>
          <span>$2.99</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${(getTotalPrice() + 2.99).toFixed(2)}</span>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="cart-actions">
        <button 
          onClick={placeOrder} 
          disabled={loading}
          className="place-order-btn"
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default Cart;
