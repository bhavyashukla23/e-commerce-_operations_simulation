const pool = require('../config/db');

// Get all products
exports.getAllProducts = async (req, res, next) => {
    try {
        const [products] = await pool.query('SELECT * FROM products');
        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
};

// Get a product by ID
exports.getProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const [product] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        if (product.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product[0]);
    } catch (err) {
        next(err);
    }
};

// Create a new product
exports.createProduct = async (req, res, next) => {
    const { name, description, price, stock } = req.body;
    try {
        await pool.query('INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)', [name, description, price, stock]);
        res.status(201).json({ message: 'Product created' });
    } catch (err) {
        next(err);
    }
};

// Update a product
exports.updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    try {
        await pool.query('UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?', [name, description, price, stock, id]);
        res.status(200).json({ message: 'Product updated' });
    } catch (err) {
        next(err);
    }
};

// Delete a product
exports.deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM products WHERE id = ?', [id]);
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        next(err);
    }
};
