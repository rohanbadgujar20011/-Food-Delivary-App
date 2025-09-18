import React, { useEffect } from 'react';
import './ErrorPopup.css';

const ErrorPopup = ({ message, onClose, type = 'error' }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto close after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '❌';
    }
  };

  return (
    <div className={`error-popup ${type}`}>
      <div className="popup-content">
        <div className="popup-icon">
          {getIcon()}
        </div>
        <div className="popup-message">
          {message}
        </div>
        <button 
          className="popup-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;
