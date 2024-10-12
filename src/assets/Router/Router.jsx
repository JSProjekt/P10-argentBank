import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/HomePage';
import Login from '../pages/LoginPage';
import Header from '../components/Header';
import Footer from '../components/Footer';


const Router = () => {
    return (
        <Router>
            <Header />
            <Routes>

                <Route path="/" component={Home} />
                <Route path="/login" component={Login} />
                
            </Routes>
            <Footer />
        </Router>
    );
}