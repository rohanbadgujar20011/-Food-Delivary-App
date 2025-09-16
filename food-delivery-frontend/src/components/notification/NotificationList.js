import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api';
import './Notification.css';

const NotificationList = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchNotifications();
      // Poll for new notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const response = await api.get(`/notifications/user/${user.id}`);
      setNotifications(response.data);
    } catch (error) {
      setError('Failed to fetch notifications');
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await api.put(`/notifications/${notificationId}/read`);
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put(`/notifications/user/${user.id}/read-all`);
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, isRead: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'ORDER_CONFIRMED':
        return '✅';
      case 'ORDER_PREPARING':
        return '👨‍🍳';
      case 'ORDER_OUT_FOR_DELIVERY':
        return '🚚';
      case 'ORDER_DELIVERED':
        return '🎉';
      case 'ORDER_CANCELLED':
        return '❌';
      case 'PAYMENT_SUCCESS':
        return '💳';
      case 'PAYMENT_FAILED':
        return '⚠️';
      case 'PROMOTION':
        return '🎁';
      case 'SYSTEM':
        return '🔔';
      default:
        return '📢';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (loading) {
    return (
      <div className="notification-list-container">
        <div className="loading">Loading notifications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notification-list-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="notification-list-container">
      <div className="notification-header">
        <h2>Notifications</h2>
        {unreadCount > 0 && (
          <div className="unread-badge">
            {unreadCount} unread
          </div>
        )}
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="mark-all-read-btn"
          >
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="no-notifications">
          <p>No notifications yet.</p>
        </div>
      ) : (
        <div className="notifications-list">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
              onClick={() => !notification.isRead && markAsRead(notification.id)}
            >
              <div className="notification-icon">
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="notification-content">
                <h4 className="notification-title">
                  {notification.title}
                </h4>
                <p className="notification-message">
                  {notification.message}
                </p>
                <p className="notification-time">
                  {formatDate(notification.createdAt)}
                </p>
              </div>
              
              {!notification.isRead && (
                <div className="unread-indicator"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationList;
