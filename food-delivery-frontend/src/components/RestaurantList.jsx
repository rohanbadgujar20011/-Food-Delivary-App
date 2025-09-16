import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('/restaurants');
                setRestaurants(response.data);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchRestaurants();
    }, []);

    const handleRestaurantClick = (id) => {
        navigate(`/menu/${id}`);
    };

    return (
        <div className="restaurant-list">
            <h2>Restaurants</h2>
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant.id} onClick={() => handleRestaurantClick(restaurant.id)}>
                        <h3>{restaurant.name}</h3>
                        <p>{restaurant.location}</p>
                        <p>Rating: {restaurant.rating}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantList;