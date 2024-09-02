import React from 'react';
import Cart from '../Components/Cart';

const CartPage = ({ userId }) => {
    return (
        <div>
            <h1>Your Shopping Cart</h1>
            <Cart userId={userId} />
        </div>
    );
};

export default CartPage;
