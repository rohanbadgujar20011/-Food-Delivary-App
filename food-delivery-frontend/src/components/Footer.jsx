import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Food Delivery System. All rights reserved.</p>
                <ul className="footer-links">
                    <li><a href="/terms">Terms of Service</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;