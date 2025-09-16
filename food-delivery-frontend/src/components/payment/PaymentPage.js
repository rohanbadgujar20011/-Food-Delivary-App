import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api';
import './Payment.css';

const PaymentPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [orderId, setOrderId] = useState(null);
  const [amount, setAmount] = useState(0);
  const [paymentMode, setPaymentMode] = useState('CARD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (location.state?.orderId && location.state?.amount) {
      setOrderId(location.state.orderId);
      setAmount(location.state.amount);
    } else {
      // If no order data, redirect to restaurants
      navigate('/restaurants');
    }
  }, [user, navigate, location.state]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const paymentData = {
        orderId: orderId,
        amount: amount,
        mode: paymentMode
      };

      const response = await api.post('/payments', paymentData);
      setPaymentStatus(response.data.status);
      
      // Redirect to orders page after successful payment
      if (response.data.status === 'SUCCESS') {
        setTimeout(() => {
          navigate('/orders');
        }, 2000);
      }
      
    } catch (error) {
      setError(error.response?.data?.message || 'Payment failed');
      setPaymentStatus('FAILED');
      console.error('Error processing payment:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!orderId || !amount) {
    return (
      <div className="payment-container">
        <div className="loading">Loading payment details...</div>
      </div>
    );
  }

  if (paymentStatus) {
    return (
      <div className="payment-container">
        <div className={`payment-result ${paymentStatus.toLowerCase()}`}>
          <div className="result-icon">
            {paymentStatus === 'SUCCESS' ? '✅' : '❌'}
          </div>
          <h2>
            Payment {paymentStatus === 'SUCCESS' ? 'Successful!' : 'Failed'}
          </h2>
          <p>
            {paymentStatus === 'SUCCESS' 
              ? 'Your order has been confirmed and will be prepared soon.'
              : 'There was an issue processing your payment. Please try again.'
            }
          </p>
          {paymentStatus === 'SUCCESS' && (
            <p>Redirecting to orders page...</p>
          )}
          {paymentStatus === 'FAILED' && (
            <button 
              onClick={() => setPaymentStatus(null)}
              className="retry-payment-btn"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-form">
        <h2>Payment</h2>
        
        <div className="payment-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Order ID:</span>
            <span>#{orderId}</span>
          </div>
          <div className="summary-row">
            <span>Amount:</span>
            <span>${amount.toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handlePayment}>
          <div className="form-group">
            <label htmlFor="paymentMode">Payment Method</label>
            <select
              id="paymentMode"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              required
            >
              <option value="CARD">Credit/Debit Card</option>
              <option value="UPI">UPI</option>
              <option value="NET_BANKING">Net Banking</option>
              <option value="CASH_ON_DELIVERY">Cash on Delivery</option>
            </select>
          </div>

          {paymentMode === 'CARD' && (
            <div className="card-details">
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="cardName">Cardholder Name</label>
                <input
                  type="text"
                  id="cardName"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
          )}

          {paymentMode === 'UPI' && (
            <div className="form-group">
              <label htmlFor="upiId">UPI ID</label>
              <input
                type="text"
                id="upiId"
                placeholder="yourname@paytm"
                required
              />
            </div>
          )}

          {paymentMode === 'NET_BANKING' && (
            <div className="form-group">
              <label htmlFor="bank">Select Bank</label>
              <select id="bank" required>
                <option value="">Choose your bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
              </select>
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            disabled={loading}
            className="payment-button"
          >
            {loading ? 'Processing Payment...' : `Pay $${amount.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
