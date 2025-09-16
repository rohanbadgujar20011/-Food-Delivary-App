import React from 'react';
import RestaurantList from '../components/RestaurantList';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Food Delivery System</h1>
            <p>Explore the best restaurants in your area.</p>
            <RestaurantList />
        </div>
    );
};

export default Home;