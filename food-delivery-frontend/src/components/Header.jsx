import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Assuming you have a CSS file for styling

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/restaurants">Restaurants</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/orders">Orders</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;