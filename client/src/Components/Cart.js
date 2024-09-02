import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = ({ userId }) => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`/cart/${userId}`);
                setCartItems(response.data);
            } catch (err) {
                setError('Failed to fetch cart items');
            }
        };
        fetchCart();
    }, [userId]);

    const handleRemove = async (productId) => {
        try {
            await axios.delete('/cart', { data: { userId, productId } });
            setCartItems(cartItems.filter(item => item.product_id !== productId));
        } catch (err) {
            setError('Failed to remove item from cart');
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <h1>Shopping Cart</h1>
            {cartItems.map(item => (
                <div key={item.product_id}>
                    <p>Product ID: {item.product_id}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button onClick={() => handleRemove(item.product_id)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default Cart;
