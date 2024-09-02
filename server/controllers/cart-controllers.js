const pool = require('../config/db');

// Get user's cart
exports.getCart = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const [cartItems] = await pool.query('SELECT * FROM cart WHERE user_id = ?', [userId]);
        res.status(200).json(cartItems);
    } catch (err) {
        next(err);
    }
};

// Add item to cart
exports.addToCart = async (req, res, next) => {
    const { userId, productId, quantity } = req.body;
    try {
        await pool.query('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?', [userId, productId, quantity, quantity]);
        res.status(201).json({ message: 'Item added to cart' });
    } catch (err) {
        next(err);
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res, next) => {
    const { userId, productId } = req.body;
    try {
        await pool.query('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId]);
        res.status(200).json({ message: 'Item removed from cart' });
    } catch (err) {
        next(err);
    }
};
