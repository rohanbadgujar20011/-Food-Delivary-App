import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/orders');
                setOrders(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Order History</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <p>Order ID: {order.id}</p>
                        <p>Status: {order.status}</p>
                        <p>Total: ${order.total}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderHistory;