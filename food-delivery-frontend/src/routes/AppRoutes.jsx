import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Restaurants from '../pages/Restaurants';
import Menu from '../pages/Menu';
import CartPage from '../pages/CartPage';
import Orders from '../pages/Orders';
import Profile from '../pages/Profile';

const AppRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/restaurants" component={Restaurants} />
                <Route path="/menu/:restaurantId" component={Menu} />
                <Route path="/cart" component={CartPage} />
                <Route path="/orders" component={Orders} />
                <Route path="/profile" component={Profile} />
            </Switch>
        </Router>
    );
};

export default AppRoutes;