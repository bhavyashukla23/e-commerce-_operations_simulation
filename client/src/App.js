import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home';
import CartPage from './Pages/CartPage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import Header from './Components/Header';
import Footer from './Components/Footer';

const App = () => {
    const [userId, setUserId] = useState(null);

    const handleLogin = (id) => {
        setUserId(id);
    };

    return (
        <Router>
            <Header userId={userId} />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cart/:userId" element={<CartPage userId={userId} />} />
                    <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
