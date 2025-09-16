import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(items);
        calculateTotal(items);
    }, []);

    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
    };

    const handlePlaceOrder = async () => {
        try {
            const response = await axios.post('/api/orders', { items: cartItems });
            alert('Order placed successfully!');
            setCartItems([]);
            localStorage.removeItem('cart');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                {item.name} - ${item.price} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                    <button onClick={handlePlaceOrder}>Place Order</button>
                </div>
            )}
        </div>
    );
};

export default Cart;