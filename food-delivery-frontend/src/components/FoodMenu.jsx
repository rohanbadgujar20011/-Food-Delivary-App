import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { useParams } from 'react-router-dom';

const FoodMenu = () => {
    const { restaurantId } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get(`/restaurants/${restaurantId}/menu`);
                setMenuItems(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, [restaurantId]);

    const handleAddToCart = (item) => {
        // Logic to add item to cart
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Menu</h2>
            <ul>
                {menuItems.map(item => (
                    <li key={item.id}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>Price: ${item.price}</p>
                        <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FoodMenu;