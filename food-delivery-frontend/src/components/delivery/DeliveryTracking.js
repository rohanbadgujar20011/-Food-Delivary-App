import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import './Delivery.css';

const DeliveryTracking = () => {
  const { orderId } = useParams();
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (orderId) {
      fetchDeliveryInfo();
      // Poll for updates every 30 seconds
      const interval = setInterval(fetchDeliveryInfo, 30000);
      return () => clearInterval(interval);
    }
  }, [orderId]);

  const fetchDeliveryInfo = async () => {
    try {
      const response = await api.get(`/delivery/${orderId}`);
      setDeliveryInfo(response.data);
    } catch (error) {
      setError('Failed to fetch delivery information');
      console.error('Error fetching delivery info:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'CREATED':
        return '📋';
      case 'CONFIRMED':
        return '✅';
      case 'PREPARING':
        return '👨‍🍳';
      case 'OUT_FOR_DELIVERY':
        return '🚚';
      case 'DELIVERED':
        return '🎉';
      case 'CANCELLED':
        return '❌';
      default:
        return '❓';
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

  const getEstimatedTime = (status) => {
    switch (status) {
      case 'CREATED':
        return '30-45 minutes';
      case 'CONFIRMED':
        return '25-40 minutes';
      case 'PREPARING':
        return '15-30 minutes';
      case 'OUT_FOR_DELIVERY':
        return '5-15 minutes';
      case 'DELIVERED':
        return 'Delivered';
      default:
        return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="delivery-tracking-container">
        <div className="loading">Loading delivery information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="delivery-tracking-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!deliveryInfo) {
    return (
      <div className="delivery-tracking-container">
        <div className="no-delivery-info">
          <p>No delivery information available for this order.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="delivery-tracking-container">
      <h2>Delivery Tracking</h2>
      
      <div className="order-info">
        <h3>Order #{deliveryInfo.orderId}</h3>
        <p className="order-date">
          Placed on {new Date(deliveryInfo.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="delivery-status">
        <div className={`status-badge ${getStatusColor(deliveryInfo.status)}`}>
          <span className="status-icon">{getStatusIcon(deliveryInfo.status)}</span>
          <span className="status-text">
            {deliveryInfo.status.replace('_', ' ')}
          </span>
        </div>
        
        <div className="estimated-time">
          <strong>Estimated delivery time:</strong> {getEstimatedTime(deliveryInfo.status)}
        </div>
      </div>

      {deliveryInfo.deliveryPartner && (
        <div className="delivery-partner-info">
          <h4>Delivery Partner</h4>
          <div className="partner-details">
            <div className="partner-avatar">
              {deliveryInfo.deliveryPartner.name?.charAt(0) || 'D'}
            </div>
            <div className="partner-info">
              <p className="partner-name">{deliveryInfo.deliveryPartner.name}</p>
              {deliveryInfo.deliveryPartner.phone && (
                <p className="partner-phone">📞 {deliveryInfo.deliveryPartner.phone}</p>
              )}
              {deliveryInfo.deliveryPartner.vehicle && (
                <p className="partner-vehicle">🚗 {deliveryInfo.deliveryPartner.vehicle}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {deliveryInfo.deliveryAddress && (
        <div className="delivery-address">
          <h4>Delivery Address</h4>
          <p>{deliveryInfo.deliveryAddress}</p>
        </div>
      )}

      {deliveryInfo.trackingHistory && deliveryInfo.trackingHistory.length > 0 && (
        <div className="tracking-timeline">
          <h4>Order Timeline</h4>
          <div className="timeline">
            {deliveryInfo.trackingHistory.map((event, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <span className="timeline-icon">{getStatusIcon(event.status)}</span>
                </div>
                <div className="timeline-content">
                  <p className="timeline-status">{event.status.replace('_', ' ')}</p>
                  <p className="timeline-time">
                    {new Date(event.timestamp).toLocaleString()}
                  </p>
                  {event.note && (
                    <p className="timeline-note">{event.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {deliveryInfo.status === 'OUT_FOR_DELIVERY' && (
        <div className="live-tracking">
          <h4>Live Tracking</h4>
          <div className="tracking-map">
            <p>📍 Your order is on its way!</p>
            <p>Delivery partner is currently en route to your location.</p>
          </div>
        </div>
      )}

      <div className="delivery-actions">
        {deliveryInfo.deliveryPartner?.phone && (
          <a 
            href={`tel:${deliveryInfo.deliveryPartner.phone}`}
            className="contact-delivery-btn"
          >
            📞 Contact Delivery Partner
          </a>
        )}
      </div>
    </div>
  );
};

export default DeliveryTracking;
