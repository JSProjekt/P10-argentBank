import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Footer from '../components/Footer';
import User from '../pages/User';

const RouterApp = () => {
    return (
        <Router>
            
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/user" element={<User />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default RouterApp;