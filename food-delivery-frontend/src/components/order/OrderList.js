import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api';
import './Order.css';

const OrderList = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await api.get(`/orders/user/${user.id}`);
      setOrders(response.data);
    } catch (error) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CREATED':
        return 'status-created';
      case 'CONFIRMED':
        return 'status-confirmed';
      case 'PREPARING':
        return 'status-preparing';
      case 'OUT_FOR_DELIVERY':
        return 'status-delivery';
      case 'DELIVERED':
        return 'status-delivered';
      case 'CANCELLED':
        return 'status-cancelled';
      default:
        return 'status-unknown';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="order-list-container">
        <div className="loading">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-list-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="order-list-container">
      <h2>Order History</h2>
      
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">{formatDate(order.createdAt)}</p>
                </div>
                <div className={`order-status ${getStatusColor(order.status)}`}>
                  {order.status.replace('_', ' ')}
                </div>
              </div>

              <div className="order-details">
                <div className="order-items">
                  <h4>Items:</h4>
                  <ul>
                    {order.items?.map((item, index) => (
                      <li key={index}>
                        {item.name} x {item.quantity} - ${item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="order-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${order.subtotal?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery Fee:</span>
                    <span>${order.deliveryFee?.toFixed(2) || '2.99'}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>${order.total?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
              </div>

              {order.deliveryAddress && (
                <div className="delivery-address">
                  <h4>Delivery Address:</h4>
                  <p>{order.deliveryAddress}</p>
                </div>
              )}

              {order.deliveryPartner && (
                <div className="delivery-partner">
                  <h4>Delivery Partner:</h4>
                  <p>{order.deliveryPartner.name}</p>
                  {order.deliveryPartner.phone && (
                    <p>Phone: {order.deliveryPartner.phone}</p>
                  )}
                </div>
              )}

              <div className="order-actions">
                {order.status === 'DELIVERED' && (
                  <button className="reorder-btn">
                    Reorder
                  </button>
                )}
                {order.status === 'CREATED' && (
                  <button className="cancel-btn">
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
