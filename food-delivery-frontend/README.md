# Food Delivery System - Frontend

A modern React.js frontend application for a food delivery system that integrates with backend microservices.

## Features

### 🔐 Authentication
- **Signup**: Create account with username, email, password, and role (CUSTOMER, DELIVERY_PARTNER, RESTAURANT_OWNER)
- **Login**: Secure authentication with JWT tokens
- **Profile**: View and manage user profile information

### 🍕 Restaurants
- **Restaurant List**: Browse all available restaurants with ratings and locations
- **Restaurant Detail**: View menu items and add them to cart
- **Menu Management**: Interactive menu with add/remove functionality

### 🛒 Orders
- **Shopping Cart**: Add/remove items, adjust quantities, view total
- **Order Placement**: Place orders with automatic payment flow
- **Order History**: Track all past orders with status updates

### 💳 Payments
- **Multiple Payment Methods**: Credit/Debit cards, UPI, Net Banking, Cash on Delivery
- **Payment Processing**: Secure payment handling with status feedback
- **Order Confirmation**: Automatic redirect after successful payment

### 🚚 Delivery Tracking
- **Real-time Tracking**: Live order status updates
- **Delivery Partner Info**: Contact details and vehicle information
- **Timeline View**: Complete order journey from placement to delivery

### 🔔 Notifications
- **Real-time Updates**: Order status notifications
- **Notification Types**: Order confirmations, delivery updates, promotions
- **Mark as Read**: Manage notification status

## Technology Stack

- **React 18** with functional components and hooks
- **React Router** for navigation
- **Axios** for API communication
- **Context API** for state management
- **CSS3** with responsive design
- **JWT** for authentication

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── SignupForm.js
│   │   ├── LoginForm.js
│   │   ├── Profile.js
│   │   └── Auth.css
│   ├── restaurant/
│   │   ├── RestaurantList.js
│   │   ├── RestaurantDetail.js
│   │   └── Restaurant.css
│   ├── order/
│   │   ├── Cart.js
│   │   ├── OrderList.js
│   │   └── Order.css
│   ├── payment/
│   │   ├── PaymentPage.js
│   │   └── Payment.css
│   ├── delivery/
│   │   ├── DeliveryTracking.js
│   │   └── Delivery.css
│   ├── notification/
│   │   ├── NotificationList.js
│   │   └── Notification.css
│   ├── Navbar.js
│   ├── Home.js
│   ├── Navbar.css
│   └── Home.css
├── contexts/
│   └── AuthContext.js
├── styles/
│   └── main.css
├── api.js
├── App.jsx
└── index.js
```

## API Endpoints

The application integrates with the following backend endpoints:

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get user profile

### Restaurants
- `GET /restaurants` - Get all restaurants
- `GET /restaurants/{id}` - Get restaurant details
- `GET /restaurants/{id}/menu` - Get restaurant menu

### Orders
- `POST /orders` - Place new order
- `GET /orders/user/{userId}` - Get user orders

### Payments
- `POST /payments` - Process payment

### Delivery
- `GET /delivery/{orderId}` - Get delivery tracking info

### Notifications
- `GET /notifications/user/{userId}` - Get user notifications
- `PUT /notifications/{id}/read` - Mark notification as read
- `PUT /notifications/user/{userId}/read-all` - Mark all as read

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:8080`

### Installation

1. Navigate to the frontend directory:
```bash
cd food-delivery-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Key Features

### 🔒 Security
- JWT token authentication
- Automatic token refresh
- Protected routes
- Secure API communication

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface
- Adaptive layouts

### ⚡ Performance
- Optimized API calls
- Efficient state management
- Lazy loading components
- Minimal re-renders

### 🎨 User Experience
- Intuitive navigation
- Real-time updates
- Loading states
- Error handling
- Success feedback

## Usage

### For Customers
1. **Sign up** or **Login** to your account
2. **Browse restaurants** and view menus
3. **Add items** to your cart
4. **Place order** and proceed to payment
5. **Track delivery** in real-time
6. **View order history** and notifications

### For Delivery Partners
1. **Login** with delivery partner credentials
2. **View assigned orders**
3. **Update delivery status**
4. **Contact customers** when needed

### For Restaurant Owners
1. **Login** with restaurant owner credentials
2. **Manage menu items**
3. **View incoming orders**
4. **Update order status**

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.