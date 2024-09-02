const pool = require('../config/db');

// Create an order
exports.createOrder = async (req, res, next) => {
    const { userId, items } = req.body;
    try {
        for (const item of items) {
            const [product] = await pool.query('SELECT stock FROM products WHERE id = ?', [item.productId]);
            if (product[0].stock < item.quantity) {
                return res.status(400).json({ message: `Not enough stock for product ${item.productId}` });
            }
        }

        const [order] = await pool.query('INSERT INTO orders (user_id) VALUES (?)', [userId]);
        const orderId = order.insertId;

        for (const item of items) {
            await pool.query('UPDATE products SET stock = stock - ? WHERE id = ?', [item.quantity, item.productId]);
            await pool.query('INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)', [orderId, item.productId, item.quantity]);
        }

        res.status(201).json({ message: 'Order placed successfully', orderId });
    } catch (err) {
        next(err);
    }
};
