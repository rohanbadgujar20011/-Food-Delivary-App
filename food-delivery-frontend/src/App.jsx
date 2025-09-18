import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import './styles/main.css';

// Import components
import Navbar from './components/Navbar';
import Home from './components/Home';
import UserDashboard from './components/UserDashboard';
import ErrorPopup from './components/ErrorPopup';

// Auth components
import SignupForm from './components/auth/SignupForm';
import LoginForm from './components/auth/LoginForm';
import Profile from './components/auth/Profile';

// Restaurant components
import RestaurantList from './components/restaurant/RestaurantList';
import RestaurantDetail from './components/restaurant/RestaurantDetail';

// Order components
import Cart from './components/order/Cart';
import OrderList from './components/order/OrderList';

// Payment component
import PaymentPage from './components/payment/PaymentPage';

// Delivery component
import DeliveryTracking from './components/delivery/DeliveryTracking';

// Notification component
import NotificationList from './components/notification/NotificationList';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/restaurants" element={<RestaurantList />} />
              <Route path="/restaurants/:id" element={<RestaurantDetail />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<OrderList />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/delivery/:orderId" element={<DeliveryTracking />} />
              <Route path="/notifications" element={<NotificationList />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;