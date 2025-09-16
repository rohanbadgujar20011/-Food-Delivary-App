# 🍕 Food Delivery System

A full-stack food delivery application built with React.js frontend and Node.js backend microservices.

## 🚀 Features

### Frontend (React.js)
- **User Authentication** - Signup, Login, Profile management
- **Restaurant Browsing** - View restaurants with ratings and locations
- **Menu Management** - Browse menus and add items to cart
- **Shopping Cart** - Add/remove items, adjust quantities
- **Order Management** - Place orders and track status
- **Payment Integration** - Multiple payment methods
- **Delivery Tracking** - Real-time order tracking
- **Notifications** - Real-time notifications system
- **Responsive Design** - Mobile-first approach

### Backend (Node.js)
- **Authentication Service** - JWT-based authentication
- **Restaurant Service** - Restaurant and menu management
- **Order Service** - Order processing and management
- **Payment Service** - Payment processing
- **Delivery Service** - Delivery tracking
- **Notification Service** - Real-time notifications

## 🏗️ Project Structure

```
Food Application/
├── food-delivery-frontend/          # React.js Frontend
│   ├── public/                      # Static files
│   ├── src/                         # Source code
│   │   ├── components/              # React components
│   │   │   ├── auth/               # Authentication components
│   │   │   ├── restaurant/         # Restaurant components
│   │   │   ├── order/              # Order components
│   │   │   ├── payment/            # Payment components
│   │   │   ├── delivery/           # Delivery components
│   │   │   └── notification/       # Notification components
│   │   ├── contexts/               # React contexts
│   │   ├── styles/                 # CSS styles
│   │   └── api.js                  # API configuration
│   ├── package.json
│   └── README.md
├── server/                          # Node.js Backend
│   ├── config/                     # Configuration files
│   ├── controller/                 # Route controllers
│   ├── model/                      # Data models
│   ├── routes/                     # API routes
│   ├── server.js                   # Main server file
│   └── package.json
├── .gitignore
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **CORS** - Cross-origin requests

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for backend)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/rohanbadgujar20011/-Food-Delivary-App.git
cd -Food-Delivary-App
```

2. **Install Frontend Dependencies**
```bash
cd food-delivery-frontend
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../server
npm install
```

### Running the Application

1. **Start the Backend Server**
```bash
cd server
npm start
```
The backend will run on `http://localhost:8080`

2. **Start the Frontend Development Server**
```bash
cd food-delivery-frontend
npm start
```
The frontend will run on `http://localhost:3000`

## 📱 Usage

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

## 🔧 API Endpoints

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
- `GET /delivery/{orderId}` - Get delivery tracking

### Notifications
- `GET /notifications/user/{userId}` - Get user notifications
- `PUT /notifications/{id}/read` - Mark notification as read

## 🎨 Features

### 🔒 Security
- JWT token authentication
- Protected routes
- Secure API communication
- Input validation

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface
- Adaptive layouts

### ⚡ Performance
- Optimized API calls
- Efficient state management
- Lazy loading
- Minimal re-renders

### 🎯 User Experience
- Intuitive navigation
- Real-time updates
- Loading states
- Error handling
- Success feedback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rohan Badgujar**
- GitHub: [@rohanbadgujar20011](https://github.com/rohanbadgujar20011)

## 🙏 Acknowledgments

- React.js community
- Node.js community
- All contributors and testers

---

⭐ **Star this repository if you found it helpful!**
